import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import * as schema from 'src/db/schema';
import { kaamgarRegisterDTO } from './dto/registeration';
import { hashString } from 'src/common/bycrypt';
@Injectable()
export class KaamgarRegisterService {
    constructor() { }
    async registerKaamgar(payload:kaamgarRegisterDTO ) {
        const encryptedPassword = await hashString(payload.passwordHash)
        return await db.insert(schema.users_login.kaamgarUsers).values({
            ...payload,
            passwordHash: encryptedPassword,
            isVerified: "pending", 
            userType: "regular"
        })
    }
}