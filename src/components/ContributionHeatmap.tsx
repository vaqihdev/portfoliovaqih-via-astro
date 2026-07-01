import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type HeatmapEntry = { type: string; title: string };
type HeatmapData = Record<string, HeatmapEntry[]>;

type Stats = {
  totalProjects: number;
  totalLabs: number;
  totalResumes: number;
  totalPublished: number;
  lastUpdated: string | null;
};

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  dateKey: string;
  entries: HeatmapEntry[];
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const LEVEL_COLORS = [
  '#ebedf0', // 0 contributions
  '#9be9a8', // 1
  '#40c463', // 2–3
  '#30a14e', // 4–6
  '#216e39', // 7+
];

const LABEL_COLORS: Record<string, string> = {
  Project: '#3178c6',
  Lab:     '#ca8a04',

  Resume:  '#a855f7',
};

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function toDisplayDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// ---------------------------------------------------------------------------
// Build a 52-week grid (Sunday → Saturday) ending today
// ---------------------------------------------------------------------------
function buildGrid(heatmap: HeatmapData): {
  weeks: Array<Array<{ dateKey: string; count: number } | null>>;
  monthLabels: Array<{ label: string; colIndex: number }>;
  totalInYear: number;
} {
  const today = new Date();
  const todayKey = [
    today.getUTCFullYear(),
    String(today.getUTCMonth() + 1).padStart(2, '0'),
    String(today.getUTCDate()).padStart(2, '0'),
  ].join('-');

  const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const startDate = new Date(endDate);
  startDate.setUTCDate(endDate.getUTCDate() - 364);

  // Rewind to nearest Sunday
  const dayOfWeek = startDate.getUTCDay();
  startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek);

  const weeks: Array<Array<{ dateKey: string; count: number } | null>> = [];
  let current = new Date(startDate);
  let totalInYear = 0;

  while (current <= endDate) {
    const week: Array<{ dateKey: string; count: number } | null> = [];
    for (let dow = 0; dow < 7; dow++) {
      const yyyy = current.getUTCFullYear();
      const mm   = String(current.getUTCMonth() + 1).padStart(2, '0');
      const dd   = String(current.getUTCDate()).padStart(2, '0');
      const key  = `${yyyy}-${mm}-${dd}`;
      if (key > todayKey) {
        week.push(null);
      } else {
        const count = (heatmap[key] ?? []).length;
        if (count > 0) totalInYear += count;
        week.push({ dateKey: key, count });
      }
      current.setUTCDate(current.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthLabels: Array<{ label: string; colIndex: number }> = [];
  let lastMonth = -1;
  for (let wi = 0; wi < weeks.length; wi++) {
    const firstNonNull = weeks[wi].find(d => d !== null);
    if (!firstNonNull) continue;
    const [, mm] = firstNonNull.dateKey.split('-').map(Number);
    const monthIdx = mm - 1;
    if (monthIdx !== lastMonth) {
      monthLabels.push({ label: MONTH_NAMES[monthIdx], colIndex: wi });
      lastMonth = monthIdx;
    }
  }

  return { weeks, monthLabels, totalInYear };
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------
function StatCard({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div style={{
      flex: '1 1 90px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: '10px 14px',
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      minWidth: '90px',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.04)',
    }}>
      <span style={{ fontSize: '18px', fontWeight: 700, color: color ?? '#0f172a', letterSpacing: '-0.5px' }}>
        {value}
      </span>
      <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function ContributionHeatmap() {
  const [heatmap, setHeatmap]       = useState<HeatmapData>({});
  const [stats, setStats]           = useState<Stats | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tooltip, setTooltip]       = useState<TooltipState>({ visible: false, x: 0, y: 0, dateKey: '', entries: [] });
  const containerRef                = useRef<HTMLDivElement>(null);
  const hasData                     = useRef(false); // track if we ever got real data

  // Core fetch with AbortController timeout — never hangs forever
  const fetchOnce = async (signal: AbortSignal): Promise<boolean> => {
    const res  = await fetch('/api/contributions', { signal });
    const data = await res.json();
    if (data.success) {
      setHeatmap(data.heatmap ?? {});
      setStats(data.stats ?? null);
      setError(null);
      hasData.current = true;
      return true;
    }
    return false;
  };

  // Fetch with up to `maxRetries` attempts, each with an 8-second timeout
  const fetchWithRetry = async (silent = false, maxRetries = 3) => {
    if (silent) setRefreshing(true);
    let lastErr = '';
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8_000); // 8-second hard timeout
      try {
        const ok = await fetchOnce(ctrl.signal);
        clearTimeout(timer);
        if (ok) {
          setLoading(false);
          setRefreshing(false);
          return;
        }
      } catch (e: any) {
        clearTimeout(timer);
        lastErr = e?.name === 'AbortError' ? 'Request timed out' : (e?.message ?? 'Network error');
        // Wait 2s before retrying (skip on last attempt)
        if (attempt < maxRetries - 1) await new Promise(r => setTimeout(r, 2_000));
      }
    }
    // All retries exhausted
    if (!silent) setError(lastErr || 'Failed after 3 attempts');
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    // Safety net: force loading=false after 12 seconds no matter what
    const safetyTimer = setTimeout(() => {
      setLoading(false);
      if (!hasData.current) setError('Could not reach server — tap ↻ to retry');
    }, 12_000);

    fetchWithRetry(false).then(() => clearTimeout(safetyTimer));

    // Silent re-poll every 30 seconds
    const pollInterval = setInterval(() => fetchWithRetry(true, 1), 30_000);

    return () => {
      clearTimeout(safetyTimer);
      clearInterval(pollInterval);
    };
  }, []);

  const { weeks, monthLabels, totalInYear } = buildGrid(heatmap);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, cell: { dateKey: string; count: number }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setTooltip({
      visible: true,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
      dateKey: cell.dateKey,
      entries: heatmap[cell.dateKey] ?? [],
    });
  };

  const handleMouseLeave = () => setTooltip(prev => ({ ...prev, visible: false }));

  if (loading) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[80, 90, 70, 80, 90, 70].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: '54px', background: '#f1f5f9', borderRadius: '8px', animation: 'heatmap-shimmer 1.5s ease-in-out infinite', animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
        <div style={{ height: '100px', background: '#f1f5f9', borderRadius: '6px', animation: 'heatmap-shimmer 1.5s ease-in-out infinite' }} />
        <style>{`
          @keyframes heatmap-shimmer {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  if (error && !hasData.current) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12px',
        color: '#94a3b8',
      }}>
        <span style={{ color: '#f59e0b' }}>⚠</span>
        <span>{error}</span>
        <button
          onClick={() => { setError(null); setLoading(true); fetchWithRetry(false); }}
          style={{
            marginLeft: 'auto',
            padding: '4px 12px',
            fontSize: '11px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            background: '#f8fafc',
            cursor: 'pointer',
            color: '#475569',
          }}
        >
          ↻ Retry
        </button>
      </div>
    );
  }

  const CELL_SIZE   = 11;
  const CELL_GAP    = 2;
  const STEP        = CELL_SIZE + CELL_GAP;
  const ROW_LABELS  = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const ROW_LABEL_W = 28;
  const gridWidth   = weeks.length * STEP - CELL_GAP;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
    }}>
      {/* Inline keyframes for the live-dot pulse */}
      <style>{`
        @keyframes heatmap-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
      `}</style>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <StatCard label="Projects"        value={stats?.totalProjects ?? 0}  color="#3178c6" />
        <StatCard label="Engineering Labs" value={stats?.totalLabs ?? 0}      color="#ca8a04" />
        <StatCard label="Resumes"         value={stats?.totalResumes ?? 0}   color="#a855f7" />
        <StatCard label="Total Published" value={stats?.totalPublished ?? 0} color="#0f172a" />
        {stats?.lastUpdated && (
          <StatCard label="Last Updated" value={toDisplayDate(stats.lastUpdated).replace(/\w+,\s/, '')} />
        )}
      </div>

      {/* Header + Legend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>
            {totalInYear.toLocaleString()} contribution{totalInYear !== 1 ? 's' : ''} in the last year
          </span>
          {/* Live indicator */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#22c55e', fontWeight: 600 }}>
            <span style={{
              display: 'inline-block', width: '6px', height: '6px',
              borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 0 0 rgba(34,197,94,0.4)',
              animation: 'heatmap-pulse 2s ease-in-out infinite',
            }} />
            LIVE
          </span>
          {/* Background refresh spinner */}
          {refreshing && (
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>
              ↻
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#94a3b8' }}>
          <span>Less</span>
          {LEVEL_COLORS.map((c, i) => (
            <div key={i} style={{
              width: '11px', height: '11px', borderRadius: '2px',
              background: c, border: '1px solid rgba(0,0,0,0.06)',
            }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div style={{ overflowX: 'auto', position: 'relative' }} ref={containerRef}>

        {/* Month labels */}
        <div style={{
          display: 'flex',
          marginLeft: `${ROW_LABEL_W + 4}px`,
          marginBottom: '4px',
          position: 'relative',
          height: '14px',
          minWidth: `${gridWidth}px`,
        }}>
          {monthLabels.map(({ label, colIndex }) => (
            <span key={`${label}-${colIndex}`} style={{
              position: 'absolute',
              left: `${colIndex * STEP}px`,
              fontSize: '10px',
              color: '#64748b',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
          ))}
        </div>

        {/* Day labels + week columns */}
        <div style={{ display: 'flex' }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: `${CELL_GAP}px`,
            marginRight: '4px', width: `${ROW_LABEL_W}px`, flexShrink: 0,
          }}>
            {ROW_LABELS.map((lbl, i) => (
              <div key={i} style={{
                height: `${CELL_SIZE}px`, fontSize: '9px', color: '#94a3b8',
                lineHeight: `${CELL_SIZE}px`, textAlign: 'right',
                paddingRight: '4px', fontWeight: 500,
              }}>
                {lbl}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: `${CELL_GAP}px`, minWidth: `${gridWidth}px` }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: `${CELL_GAP}px` }}>
                {week.map((cell, di) => {
                  if (!cell) {
                    return (
                      <div key={di} style={{
                        width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px`,
                        borderRadius: '2px', background: 'transparent',
                      }} />
                    );
                  }
                  const bg = LEVEL_COLORS[getLevel(cell.count)];
                  return (
                    <div
                      key={di}
                      onMouseEnter={e => handleMouseEnter(e, cell)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px`,
                        borderRadius: '2px', background: bg,
                        border: '1px solid rgba(0,0,0,0.06)',
                        cursor: cell.count > 0 ? 'pointer' : 'default',
                        transition: 'transform 0.1s ease',
                      }}
                      onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.45)'; }}
                      onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {tooltip.visible && (
          <div style={{
            position: 'absolute',
            top: `${tooltip.y - 8}px`,
            left: `${tooltip.x}px`,
            transform: 'translate(-50%, -100%)',
            background: '#0f172a',
            color: '#f8fafc',
            borderRadius: '6px',
            padding: '8px 10px',
            fontSize: '11px',
            lineHeight: '1.6',
            pointerEvents: 'none',
            zIndex: 50,
            maxWidth: '240px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: '2px', color: '#e2e8f0', whiteSpace: 'nowrap' }}>
              {toDisplayDate(tooltip.dateKey)}
            </div>
            <div style={{ color: '#94a3b8', marginBottom: tooltip.entries.length > 0 ? '5px' : 0, whiteSpace: 'nowrap' }}>
              {tooltip.entries.length === 0
                ? 'No contributions'
                : `${tooltip.entries.length} contribution${tooltip.entries.length > 1 ? 's' : ''}`}
            </div>
            {tooltip.entries.slice(0, 6).map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', maxWidth: '220px' }}>
                <span style={{
                  display: 'inline-block', width: '7px', height: '7px',
                  borderRadius: '50%', background: LABEL_COLORS[e.type] ?? '#94a3b8',
                  flexShrink: 0,
                }} />
                <span style={{
                  color: '#e2e8f0', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  [{e.type}] {e.title}
                </span>
              </div>
            ))}
            {tooltip.entries.length > 6 && (
              <div style={{ color: '#64748b', marginTop: '2px' }}>
                +{tooltip.entries.length - 6} more…
              </div>
            )}
            <div style={{
              position: 'absolute', bottom: '-5px', left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
              borderTop: '5px solid #0f172a', width: 0, height: 0,
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
