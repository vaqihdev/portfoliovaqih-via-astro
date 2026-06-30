export const prerender = false;

import { db } from '../../db';
import { atsResumes } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (id) {
      const data = await db.select().from(atsResumes).where(eq(atsResumes.id, parseInt(id))).limit(1).then(r => r[0]);
      if (!data) return new Response(JSON.stringify({ success: false, message: 'Not found' }), { status: 404 });
      return new Response(JSON.stringify({ success: true, data }), { headers: { 'Content-Type': 'application/json' } });
    }

    // Return all resumes
    const data = await db.select().from(atsResumes).orderBy(atsResumes.id);
    return new Response(JSON.stringify({ success: true, data }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { title, template, content } = body;

    const result = await db.insert(atsResumes).values({
      title: title || 'Untitled Resume',
      template: template || 'harvard',
      content: content || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).returning();

    return new Response(JSON.stringify({ success: true, data: result[0] }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { id, title, template, content } = body;
    
    if (!id) return new Response(JSON.stringify({ success: false, message: 'ID required' }), { status: 400 });

    const result = await db.update(atsResumes).set({
      title: title,
      template: template,
      content: content,
      updatedAt: new Date().toISOString(),
    }).where(eq(atsResumes.id, parseInt(id))).returning();

    return new Response(JSON.stringify({ success: true, data: result[0] }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) return new Response(JSON.stringify({ success: false, message: 'ID required' }), { status: 400 });

    await db.delete(atsResumes).where(eq(atsResumes.id, parseInt(id)));

    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
