import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: () => {
                const pool = new Pool({
                    connectionString: process.env.DATABASE_URL_CONSUMERS,
                });
                return drizzle({ client: pool, schema });
            },
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class DatabaseConnectionModule { }
