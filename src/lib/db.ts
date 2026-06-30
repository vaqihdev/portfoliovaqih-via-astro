import { neon } from '@neondatabase/serverless';

// Securely grab the database URL from Vite/Astro environment
// import.meta.env is populated by Astro during build/dev
const connectionString = import.meta.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in environment variables. Please add it to your .env file.");
}

// Initialize the neon serverless edge client
export const sql = neon(connectionString);
