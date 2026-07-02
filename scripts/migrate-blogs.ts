import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { engineeringAssets } from '../src/db/schema';
import { eq } from 'drizzle-orm';
import { config } from 'dotenv';
config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  console.log('Migrating Blog -> Lab...');
  try {
    await db.update(engineeringAssets)
      .set({ type: 'Lab' })
      .where(eq(engineeringAssets.type, 'Blog'));
    console.log('Migration successful!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}
main();
