import type { APIRoute } from 'astro';
import { db } from '../../db';
import { landingMetadata } from '../../db/schema';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const data = await db.select().from(landingMetadata);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
