import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { db } from '../db/index';
import { engineeringAssets, incidentReports, capabilities, landingMetadata, atsResumes } from '../db/schema';
import { eq, asc, desc } from 'drizzle-orm';

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

// -- Engineering Assets API --
app.get('/engineering-assets', async (c) => {
  try {
    const data = await db.select().from(engineeringAssets).orderBy(desc(engineeringAssets.id));
    return c.json({ success: true, data });
  } catch (err) {
    return c.json({ success: false, message: 'Database query failed' }, 500);
  }
});

app.post('/engineering-assets', async (c) => {
  try {
    const body = await c.req.json();
    await db.insert(engineeringAssets).values({
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: body.category || 'Uncategorized',
      type: body.type || 'Project',
      summary: body.summary || body.description?.substring(0, 150) || '',
      detailedContent: body.detailedContent || body.description || '',
      status: body.status || 'Draft',
      difficulty: body.difficulty || 'Intermediate',
      technologyStack: body.technologyStack || (body.tools ? body.tools.split(',').map((t: string) => t.trim()) : []),
      cloudProvider: body.cloudProvider || 'Unknown',
      operatingSystem: body.operatingSystem || 'Linux',
      repositoryUrl: body.repositoryUrl || '',
      liveDemoUrl: body.liveDemoUrl || '',
      documentationUrl: body.documentationUrl || '',
      startedDate: body.startedDate ? new Date(body.startedDate) : null,
      completedDate: body.completedDate ? new Date(body.completedDate) : null,
      readingTime: body.readingTime || '5 min',
      estimatedBuildTime: body.estimatedBuildTime || '1 day',
      version: body.version || '1.0.0',
      isFeatured: body.isFeatured === true || body.isFeatured === 'true',
      tags: body.tags || [],
      thumbnail: body.thumbnail || '',
      banner: body.banner || '',
      galleryImages: body.galleryImages || [],
      author: body.author || 'Muchamad Ghufron Vaqih',
    });
    return c.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return c.json({ success: false, message: 'Insert failed: ' + err.message }, 500);
  }
});

app.delete('/engineering-assets/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    await db.delete(engineeringAssets).where(eq(engineeringAssets.id, id));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Delete failed' }, 500);
  }
});

// -- Incident Reports API --
app.get('/incident-reports', async (c) => {
  try {
    const data = await db.select().from(incidentReports).orderBy(desc(incidentReports.id));
    return c.json({ success: true, data });
  } catch (err) {
    return c.json({ success: false, message: 'Database query failed' }, 500);
  }
});

app.post('/incident-reports', async (c) => {
  try {
    const body = await c.req.json();
    await db.insert(incidentReports).values({
      incidentId: body.incidentId || `INC-${Date.now()}`,
      severity: body.severity || 'Low',
      impact: body.impact || '',
      rootCause: body.rootCause || '',
      timeline: body.timeline || '',
      mitigation: body.mitigation || '',
      resolution: body.resolution || '',
      lessonsLearned: body.lessonsLearned || '',
      status: body.status || 'Open',
      relatedProject: body.relatedProject ? parseInt(body.relatedProject, 10) : null,
    });
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ success: false, message: 'Insert failed: ' + err.message }, 500);
  }
});

app.delete('/incident-reports/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    await db.delete(incidentReports).where(eq(incidentReports.id, id));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Delete failed' }, 500);
  }
});

// -- Legacy Endpoints (For existing layout calls that haven't been updated) --
app.get('/projects-labs', async (c) => {
  try {
    const data = await db.select().from(engineeringAssets).orderBy(asc(engineeringAssets.id));
    return c.json({ success: true, data: data.map(d => ({ ...d, description: d.detailedContent, tools: (d.technologyStack as string[]).join(', ') })) });
  } catch (err) {
    return c.json({ success: false, message: 'Database query failed' }, 500);
  }
});

app.post('/projects-labs', async (c) => {
  try {
    const body = await c.req.json();
    await db.insert(engineeringAssets).values({
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: 'Uncategorized',
      type: body.type,
      summary: body.description?.substring(0, 150) || '',
      detailedContent: body.description || '',
      status: body.status || 'Completed',
      difficulty: body.difficulty || 'Intermediate',
      technologyStack: body.tools ? body.tools.split(',').map((t: string) => t.trim()) : [],
      cloudProvider: body.cloudProvider || 'Unknown',
      operatingSystem: body.operatingSystem || 'Linux',
      isFeatured: body.isFeatured === true || body.isFeatured === 'true',
    });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Insert failed' }, 500);
  }
});

app.put('/projects-labs/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    const body = await c.req.json();
    await db.update(engineeringAssets).set({
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      type: body.type,
      summary: body.description?.substring(0, 150) || '',
      detailedContent: body.description || '',
      status: body.status || 'Completed',
      difficulty: body.difficulty || 'Intermediate',
      technologyStack: body.tools ? body.tools.split(',').map((t: string) => t.trim()) : [],
      cloudProvider: body.cloudProvider || 'Unknown',
      operatingSystem: body.operatingSystem || 'Linux',
      isFeatured: body.isFeatured === true || body.isFeatured === 'true',
      updatedAt: new Date()
    }).where(eq(engineeringAssets.id, id));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Update failed' }, 500);
  }
});

app.delete('/projects-labs/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    await db.delete(engineeringAssets).where(eq(engineeringAssets.id, id));
    return c.json({ success: true });
  } catch (err) {
    return c.json({ success: false, message: 'Delete failed' }, 500);
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
    return c.json({ success: false, message: 'Database connection failed. Please try again.', error: err.message || err.toString() }, 500);
  }
});

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

  try {
    const eaRows = await db
      .select({ id: engineeringAssets.id, title: engineeringAssets.title, type: engineeringAssets.type, createdAt: engineeringAssets.createdAt })
      .from(engineeringAssets)
      .orderBy(asc(engineeringAssets.id));

    for (const row of eaRows) {
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
  } catch (err) {}

  try {
    const resumeRows = await db
      .select({ id: atsResumes.id, title: atsResumes.title, createdAt: atsResumes.createdAt, updatedAt: atsResumes.updatedAt })
      .from(atsResumes)
      .orderBy(asc(atsResumes.id));

    for (const row of resumeRows) {
      const key = toDateKey(row.createdAt) ?? toDateKey(row.updatedAt);
      totalResumes++;
      addEntry(key, { type: 'Resume', title: row.title || 'Untitled Resume' });
    }
  } catch (err) {}

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
