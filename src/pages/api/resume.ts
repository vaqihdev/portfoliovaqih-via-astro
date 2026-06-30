export const prerender = false;

import { db } from '../../db';
import { resumeProfile } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db.select().from(resumeProfile).limit(1).then(r => r[0]);
    return new Response(JSON.stringify({ success: true, data: data || null }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const {
      fullName, jobTitle, email, phone, location, linkedIn, github, website,
      summary, experience, education, certifications
    } = body;

    const existing = await db.select().from(resumeProfile).limit(1).then(r => r[0]);

    if (existing) {
      await db.update(resumeProfile).set({
        fullName: fullName || '',
        jobTitle: jobTitle || '',
        email: email || '',
        phone: phone || '',
        location: location || '',
        linkedIn: linkedIn || '',
        github: github || '',
        website: website || '',
        summary: summary || '',
        experience: experience || [],
        education: education || [],
        certifications: certifications || [],
      }).where(eq(resumeProfile.id, existing.id));
    } else {
      await db.insert(resumeProfile).values({
        fullName: fullName || '',
        jobTitle: jobTitle || '',
        email: email || '',
        phone: phone || '',
        location: location || '',
        linkedIn: linkedIn || '',
        github: github || '',
        website: website || '',
        summary: summary || '',
        experience: experience || [],
        education: education || [],
        certifications: certifications || [],
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
