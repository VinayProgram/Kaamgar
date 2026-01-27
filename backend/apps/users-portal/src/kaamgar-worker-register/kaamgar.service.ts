import { Inject, Injectable } from '@nestjs/common';
import { kaamgarRegisterDTO } from './dto/registeration';
import { hashString } from 'libs/encryption';
import { schemaTables } from '../common/importHelpers';
import { Database, DATABASE_CONNECTION } from '../db/database-connection.module';

@Injectable()
export class KaamgarRegisterService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async registerKaamgar(payload: kaamgarRegisterDTO) {
        const encryptedPassword = await hashString(payload.passwordHash)
        const email = payload.email.toLowerCase().trim();
        return await this.db.insert(schemaTables.users_login.kaamgarUsers).values({
            ...payload,
            userId: crypto.randomUUID(),
            email: email,
            passwordHash: encryptedPassword,
            isVerified: "pending",
            userType: "regular"
        })
    }
}