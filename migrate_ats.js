import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon('postgresql://neondb_owner:npg_PkmfLW4MJ2Bv@ep-weathered-glitter-atk5shrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS ats_resumes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
        template VARCHAR(50) NOT NULL DEFAULT 'harvard',
        content JSONB NOT NULL DEFAULT '{}',
        created_at VARCHAR(50) NOT NULL,
        updated_at VARCHAR(50) NOT NULL
      )
    `;
    console.log('Table ats_resumes created!');
    
    // Seed initial empty resume to avoid empty states
    const result = await sql`SELECT * FROM ats_resumes LIMIT 1`;
    if (result.length === 0) {
      await sql`INSERT INTO ats_resumes (title, template, content, created_at, updated_at) VALUES ('Software Engineer (Harvard)', 'harvard', '{}', extract(epoch from now())::varchar, extract(epoch from now())::varchar)`;
      console.log('Seeded initial resume!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
main();
