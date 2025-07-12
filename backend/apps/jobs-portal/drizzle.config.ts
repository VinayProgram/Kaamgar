import 'dotenv/config';
import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/**/*schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_JOBS! || "postgresql://postgres:password@localhost:2012/postgres",
  },
  strict:false,
}) satisfies Config;
