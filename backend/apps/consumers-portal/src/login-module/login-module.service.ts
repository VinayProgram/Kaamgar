import { Inject, Injectable } from '@nestjs/common';
import { signupDtoSchema } from './types/login.dto';
import { eq } from 'drizzle-orm';
import { Database, DATABASE_CONNECTION } from '../db/database-connection.module';
import { schemaTables } from '../common/importHelpers';
import { compareHash, hashString, signToken, verifyToken } from 'libs/encryption';

@Injectable()
export class LoginModuleService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async signup(signupDto: signupDtoSchema) {
        const encryptedPassword = await hashString(signupDto.password);
        return await this.db.insert(schemaTables.users_login.consumers).values({
            fullName: signupDto.fullName,
            email: signupDto.email,
            phoneNumber: signupDto.phoneNumber,
            passwordHash: encryptedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLoginAt: null,
        }).returning({ email: schemaTables.users_login.consumers.email });
    }

    // Implement login logic here
    async login(loginDto: { email: string; password: string }) {
        const user = await this.db.select().from(schemaTables.users_login.consumers)
            .where(eq(schemaTables.users_login.consumers.email, loginDto.email)).limit(1);
        if (user.length === 0) {
            throw new Error('User not found');
        }
        const isPasswordValid = await compareHash(loginDto.password, user[0].passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = signToken({
            userId: user[0].id,
            email: user[0].email,
            fullName: user[0].fullName,
            phoneNumber: user[0].phoneNumber,
            type: 'consumer',
        },
            'hehehehe'
        )
        return {
            email: loginDto.email,
            token: token,
        };
    }

    async checkAuth(token: string) {
        return await verifyToken(token, 'hehehehe')
    }
}

