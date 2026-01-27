import { Global, Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export type Database = NodePgDatabase<typeof schema>;


@Global()
@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: () => {
                console.log('DATABASE_URL_CONSUMERS', process.env.DATABASE_URL_CONSUMERS)
                const pool = new Pool({
                    connectionString: process.env.DATABASE_URL_CONSUMERS,
                });
                return drizzle({ client: pool });
            },
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class DatabaseConnectionModule { }
