import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon('postgresql://neondb_owner:npg_PkmfLW4MJ2Bv@ep-weathered-glitter-atk5shrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require');
  try {
    const result = await sql`SELECT * FROM resume_profile LIMIT 1`;
    console.log('Result:', result);
    if (result.length === 0) {
      console.log('Inserting default row...');
      await sql`INSERT INTO resume_profile (full_name, job_title, email, phone, location, linked_in, github, website, summary, experience, education, certifications)
      SELECT 'Muchamad Ghufron Vaqih', 'Cloud Infrastructure Engineer & DevOps Architect', 'admin@vaqih.dev', '', 'Indonesia', 'https://www.linkedin.com/in/muchamad-ghufron-vaqih-b3a2b2410', 'https://github.com/vaqihdev', '', '', '[]', '[]', '[]'
      WHERE NOT EXISTS (SELECT 1 FROM resume_profile LIMIT 1)`;
      console.log('Default row inserted!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
main();
