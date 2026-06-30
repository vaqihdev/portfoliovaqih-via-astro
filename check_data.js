import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon('postgresql://neondb_owner:npg_PkmfLW4MJ2Bv@ep-weathered-glitter-atk5shrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require');
  
  const oldResumes = await sql`SELECT * FROM resume_profile LIMIT 1`;
  console.log("OLD RESUME:", JSON.stringify(oldResumes[0], null, 2));

  const newResumes = await sql`SELECT * FROM ats_resumes LIMIT 1`;
  console.log("NEW RESUME:", JSON.stringify(newResumes[0], null, 2));
}
main();
