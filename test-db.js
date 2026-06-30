import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
sql`SELECT 1`.then(console.log).catch(console.error);
