import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import * as schema from 'src/db/schema';
@Injectable()
export class KaamgarRegisterService {
    constructor() { }
    async getKaamgarDetails(kaamgarId: string) {
        return await db.select().from(schema.users_login.kaamgarUsers)
    }
}