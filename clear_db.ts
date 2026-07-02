import { db } from './src/db/index';
import { engineeringAssets } from './src/db/schema';

async function clearDB() {
  console.log("Clearing engineeringAssets table...");
  try {
    await db.delete(engineeringAssets);
    console.log("Database cleared successfully!");
  } catch (err) {
    console.error("Error clearing database:", err);
  }
}

clearDB();
