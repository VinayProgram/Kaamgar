import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
console.log('Database URL:', process.env.DATABASE_URL_CONSUMERS);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL_CONSUMERS!,
});

export const db = drizzle({ client: pool });

