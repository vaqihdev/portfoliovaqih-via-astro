import { useState, useEffect, useCallback } from 'react';
import type { ResumeData, ResumeContent } from './types';
import { defaultResumeContent } from './types';
import EditorPanel from '@/components/resume-builder/EditorPanel.tsx';
import PreviewPanel from '@/components/resume-builder/PreviewPanel.tsx';

interface Props {
  initialResumeId?: number;
}

export default function ResumeBuilderApp({ initialResumeId }: Props) {
  const [resume, setResume] = useState<ResumeData>({
    title: 'Untitled Resume',
    template: 'harvard',
    content: defaultResumeContent
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load data
  useEffect(() => {
    async function load() {
      try {
        const url = initialResumeId ? `/api/builder?id=${initialResumeId}` : '/api/builder';
        const res = await fetch(url);
        const json = await res.json();

        if (json.success && json.data) {
          // If fetching all (no ID passed), just pick the first one for now
          const target = Array.isArray(json.data) ? json.data[0] : json.data;
          if (target) {
            setResume({
              id: target.id,
              title: target.title,
              template: target.template,
              content: { ...defaultResumeContent, ...target.content }
            });
          }
        }
      } catch (err) {
        console.error("Failed to load resume:", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [initialResumeId]);

  const saveResumeToDb = async (resumeToSave: ResumeData) => {
    setIsSaving(true);
    try {
      await fetch('/api/builder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeToSave)
      });
      setLastSaved(new Date());
    } catch (e) {
      console.error("Save failed", e);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto save
  useEffect(() => {
    if (isLoading || !resume.id) return;

    const saveTimer = setTimeout(() => {
      saveResumeToDb(resume);
    }, 1500); // 1.5s debounce

    return () => clearTimeout(saveTimer);
  }, [resume, isLoading]);

  const handleManualSave = () => {
    if (resume.id) {
      saveResumeToDb(resume);
    }
  };

  const updateContent = useCallback((updater: (prev: ResumeContent) => ResumeContent) => {
    setResume(prev => ({
      ...prev,
      content: updater(prev.content)
    }));
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path></svg>
          <p className="text-sm font-medium tracking-wide">Loading Editor Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-slate-900 font-sans">

      {/* Left Panel: Editor */}
      <div id="editor-panel" className="w-[45%] h-full flex flex-col border-r border-slate-200 bg-slate-50/50 print:hidden shadow-[1px_0_10px_rgba(0,0,0,0.03)] z-10 relative">
        <div className="h-14 px-6 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <a href="/admin" className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors cursor-pointer" title="Back to Admin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </a>
            <input
              type="text"
              value={resume.title}
              onChange={(e) => setResume(p => ({ ...p, title: e.target.value }))}
              className="text-sm font-bold bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 w-64 hover:bg-slate-50 px-2 py-1 rounded"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            {isSaving ? (
              <span className="text-blue-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span> Saving...
              </span>
            ) : lastSaved ? (
              <span className="text-slate-400">
                Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <EditorPanel content={resume.content} updateContent={updateContent} />
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div id="preview-panel" className="w-[55%] h-full bg-[#f3f4f6] relative print:w-full print:bg-white print:h-auto overflow-hidden flex flex-col">
        <div id="preview-header" className="h-14 px-6 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-20 print:hidden shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Live Preview</span>
            <select
              value={resume.template}
              onChange={(e) => setResume(p => ({ ...p, template: e.target.value }))}
              className="text-xs border border-slate-200 rounded px-2 py-1 bg-slate-50 focus:outline-none"
            >
              <option value="harvard">Harvard ATS</option>
              {/* Future templates can go here */}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              {isSaving ? 'Saving...' : 'Save Data'}
            </button>
            <button
              className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              onClick={async () => {
                await saveResumeToDb(resume);
                window.open('/resume?print=true', '_blank');
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export PDF
            </button>
          </div>
        </div>

        <div id="preview-content" className="flex-1 overflow-y-auto p-4 sm:p-8 print:p-0 print:overflow-visible overflow-x-auto">
          <div className="min-w-[850px] flex justify-center print:min-w-0 print:block">
            <PreviewPanel resume={resume} />
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        @media print {
          @page { margin: 0; size: A4; }
          body, html { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide UI completely */
          #editor-panel, #preview-header { 
            display: none !important; 
          }
          
          /* Expand preview */
          #preview-panel {
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            background: white !important;
          }
          
          #preview-content {
            overflow: visible !important;
            padding: 0 !important;
            display: block !important;
          }
          
          /* Reset paper styles */
          .shadow-xl { box-shadow: none !important; border: none !important; }
        }
      `}</style>
    </div>
  );
}
