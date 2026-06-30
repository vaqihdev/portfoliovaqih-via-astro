import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { db } from '../db/index';
import { projectsLabs, capabilities, landingMetadata } from '../db/schema';
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

app.post('/logout', (c) => {
  deleteCookie(c, 'admin_session', { path: '/' });
  return c.json({ success: true });
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
    
    // Attempt to update the single row
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
    return c.json({ success: true });
  } catch (err) {
    console.error('Update failed error:', err);
    return c.json({ success: false, message: 'Update failed' }, 500);
  }
});

export default app;
