import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { db } from '../db/index';
import { projectsLabs, capabilities, landingMetadata, atsResumes } from '../db/schema';
import { eq, asc } from 'drizzle-orm';

const app = new Hono().basePath('/api');

app.post('/auth', async (c) => {
  const body = await c.req.json();
  const username = body.username?.trim();
  const password = body.password?.trim();
  
  const envUser = import.meta.env.ADMIN_USERNAME || 'admin';
  const envPass = import.meta.env.ADMIN_PASSWORD || 'admin123';
  
  if (username === envUser && password === envPass) {
    setCookie(c, 'admin_session', 'true', { 
      path: '/', 
      httpOnly: true, 
      secure: import.meta.env.PROD, 
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24
    });
    return c.json({ success: true });
  }
  return c.json({ success: false, message: 'Invalid Credentials' }, 401);
});

app.get('/projects-labs', async (c) => {
  try {
    const data = await db.select().from(projectsLabs).orderBy(asc(projectsLabs.id));
    return c.json({ success: true, data });
  } catch (err) {
    return c.json({ success: false, message: 'Database query failed' }, 500);
  }
});

app.get('/capabilities', async (c) => {
  try {
    const data = await db.select().from(capabilities).orderBy(asc(capabilities.orderIndex));
    return c.json({ success: true, data });
  } catch (err) {
    return c.json({ success: false, message: 'Database query failed' }, 500);
  }
});

app.get('/logout', (c) => {
  deleteCookie(c, 'admin_session', { path: '/' });
  return c.redirect('/');
});

app.post('/projects-labs', async (c) => {
  try {
    const body = await c.req.json();
    await db.insert(projectsLabs).values({
      title: body.title,
      type: body.type,
      description: body.description || '',
      isFeatured: body.isFeatured === true || body.isFeatured === 'true',
      tools: body.tools || ''
    });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Insert failed' }, 500);
  }
});

app.delete('/projects-labs/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    await db.delete(projectsLabs).where(eq(projectsLabs.id, id));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Delete failed' }, 500);
  }
});

app.post('/capabilities', async (c) => {
  try {
    const body = await c.req.json();
    await db.insert(capabilities).values({
      skillName: body.skillName || body.name,
      category: body.category,
      level: body.level || 'proficient',
      orderIndex: body.orderIndex ? parseInt(body.orderIndex, 10) : 99
    });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Insert failed' }, 500);
  }
});

app.delete('/capabilities/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    await db.delete(capabilities).where(eq(capabilities.id, id));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Delete failed' }, 500);
  }
});

app.put('/landing-metadata', async (c) => {
  try {
    const body = await c.req.json();
    
    // Retry logic for Neon serverless cold starts
    const attemptUpdate = async (retries = 3): Promise<void> => {
      try {
        const existing = await db.select().from(landingMetadata).limit(1);
        if (existing.length > 0) {
          await db.update(landingMetadata).set({
            heroFirstName: body.heroFirstName,
            heroLastName: body.heroLastName,
            heroSubtitle: body.heroSubtitle,
            heroShortBio: body.heroShortBio,
            aboutHeading: body.aboutHeading,
            aboutLongDesc: body.aboutLongDesc,
            coreDomains: body.coreDomains
          }).where(eq(landingMetadata.id, existing[0].id));
        } else {
          await db.insert(landingMetadata).values({
            heroFirstName: body.heroFirstName,
            heroLastName: body.heroLastName,
            heroSubtitle: body.heroSubtitle,
            heroShortBio: body.heroShortBio,
            aboutHeading: body.aboutHeading,
            aboutLongDesc: body.aboutLongDesc,
            coreDomains: body.coreDomains
          });
        }
      } catch (err: any) {
        if (retries > 0) {
          console.log(`Database query failed, retrying... (${retries} left)`);
          await new Promise(r => setTimeout(r, 1000));
          return attemptUpdate(retries - 1);
        }
        throw err;
      }
    };

    await attemptUpdate();
    return c.json({ success: true });
  } catch (err: any) {
    console.error('Update failed error:', err);
    return c.json({ success: false, message: 'Database connection failed. Please try again.', error: err.message || err.toString() }, 500);
  }
});

// ---------------------------------------------------------------------------
// GET /api/contributions
// Aggregates all CMS content by creation date to power the heatmap.
// Each table query is independent — one failure won't break the whole response.
// To add a new table in the future: query it below and merge into `heatmap`.
// ---------------------------------------------------------------------------
app.get('/contributions', async (c) => {
  type HeatmapEntry = { type: string; title: string };
  const heatmap: Record<string, HeatmapEntry[]> = {};
  let totalProjects = 0, totalLabs = 0, totalResumes = 0;

  const toDateKey = (raw: Date | string | null | undefined): string | null => {
    if (!raw) return null;
    const d = raw instanceof Date ? raw : new Date(raw as string);
    if (isNaN(d.getTime())) return null;
    const yyyy = d.getUTCFullYear();
    const mm   = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd   = String(d.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const addEntry = (dateKey: string | null, entry: HeatmapEntry) => {
    if (!dateKey) return;
    if (!heatmap[dateKey]) heatmap[dateKey] = [];
    heatmap[dateKey].push(entry);
  };

  // 1. projectsLabs — Projects, Labs, Blogs
  try {
    const plRows = await db
      .select({ id: projectsLabs.id, title: projectsLabs.title, type: projectsLabs.type, createdAt: projectsLabs.createdAt })
      .from(projectsLabs)
      .orderBy(asc(projectsLabs.id));

    for (const row of plRows) {
      const key = toDateKey(row.createdAt);
      const rowType = row.type?.toUpperCase();
      if (rowType === 'LAB') {
        totalLabs++;
        addEntry(key, { type: 'Lab', title: row.title });
      } else {
        totalProjects++;
        addEntry(key, { type: 'Project', title: row.title });
      }
    }
  } catch (err) {
    console.error('[contributions] projectsLabs query failed:', err);
    // Continue — don't abort the whole response
  }

  // 2. atsResumes — independent query, won't break if it fails
  try {
    const resumeRows = await db
      .select({ id: atsResumes.id, title: atsResumes.title, createdAt: atsResumes.createdAt, updatedAt: atsResumes.updatedAt })
      .from(atsResumes)
      .orderBy(asc(atsResumes.id));

    for (const row of resumeRows) {
      // Try createdAt first, fall back to updatedAt
      const key = toDateKey(row.createdAt) ?? toDateKey(row.updatedAt);
      totalResumes++;
      addEntry(key, { type: 'Resume', title: row.title || 'Untitled Resume' });
    }
  } catch (err) {
    console.error('[contributions] atsResumes query failed:', err);
    // Continue — projectsLabs data is still valid
  }

  const allDates = Object.keys(heatmap).sort();
  const lastUpdated = allDates.length > 0 ? allDates[allDates.length - 1] : null;

  return c.json({
    success: true,
    heatmap,
    stats: {
      totalProjects,
      totalLabs,
      totalResumes,
      totalPublished: totalProjects + totalLabs + totalResumes,
      lastUpdated,
    },
  });
});

export default app;
