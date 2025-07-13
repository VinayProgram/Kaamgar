import 'dotenv/config';
import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/**/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_USERS!,
  },
  strict:false,
}) satisfies Config;
