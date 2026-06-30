import { db } from './src/db/index';
import { projectsLabs } from './src/db/schema';

async function clearDB() {
  console.log("Clearing projectsLabs table...");
  try {
    await db.delete(projectsLabs);
    console.log("Database cleared successfully!");
  } catch (err) {
    console.error("Error clearing database:", err);
  }
}

clearDB();
