import { Injectable } from '@nestjs/common';
import { kaamgarRegisterDTO } from './dto/registeration';
import { hashString } from 'libs/encryption';
import { schemaTables } from '../common/importHelpers';
import { db } from '../db';
@Injectable()
export class KaamgarRegisterService {
    constructor() { }
    async registerKaamgar(payload:kaamgarRegisterDTO ) {
        const encryptedPassword = await hashString(payload.passwordHash)
        const email = payload.email.toLowerCase().trim();
        return await db.insert(schemaTables.users_login.kaamgarUsers).values({
            ...payload,
            userId: crypto.randomUUID(),
            email: email,
            passwordHash: encryptedPassword,
            isVerified: "pending", 
            userType: "regular"
        })
    }
}