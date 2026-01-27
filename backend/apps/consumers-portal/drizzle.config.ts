import 'dotenv/config';
import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_CONSUMERS! || "postgresql://postgres:password@localhost:2011/postgres",
  },
  strict: false,
}) satisfies Config;
