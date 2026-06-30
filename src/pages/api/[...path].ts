import type { APIRoute } from 'astro';
import app from '../../server'; // Path to your Hono server instance

export const prerender = false;

export const ALL: APIRoute = ({ request }) => app.fetch(request);
