import * as dotenv from 'dotenv';
dotenv.config();
import { Config, defineConfig } from 'drizzle-kit';
const a = () => {
  console.log(process.env.DATABASE_URL_USERS)
  return {
    out: './drizzle',
    schema: './src/**/*.ts',
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DATABASE_URL_USERS! || "postgresql://postgres:password@localhost:2010/postgres",
    },
    strict: false,
  } satisfies Config;
}
export default defineConfig(a());
