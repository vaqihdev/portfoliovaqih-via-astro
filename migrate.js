import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function run() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS landing_metadata (
        id SERIAL PRIMARY KEY,
        hero_first_name VARCHAR(100) NOT NULL,
        hero_last_name VARCHAR(100) NOT NULL,
        hero_subtitle VARCHAR(255) NOT NULL,
        hero_short_bio TEXT NOT NULL,
        about_heading VARCHAR(255) NOT NULL,
        about_long_desc TEXT NOT NULL,
        core_domains TEXT NOT NULL
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS projects_labs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        tools TEXT NOT NULL,
        description TEXT NOT NULL,
        is_featured BOOLEAN DEFAULT false NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS capabilities (
        id SERIAL PRIMARY KEY,
        skill_name VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        level VARCHAR(50) NOT NULL,
        order_index INTEGER DEFAULT 99 NOT NULL
      );
    `;
    console.log("Migration successful");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}
run();
