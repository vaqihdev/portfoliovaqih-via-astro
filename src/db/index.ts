import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = import.meta.env.DATABASE_URL || 'postgres://placeholder_user:placeholder_password@ep-placeholder.neon.tech/neondb';

// We use the neon-http driver for edge serverless deployments.
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
