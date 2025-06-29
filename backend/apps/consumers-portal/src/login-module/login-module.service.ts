import { Injectable } from '@nestjs/common';
import { compareHash, hashString } from '@km/commonlibs';
import { schemaTables } from 'src/common/importHelpers';
import { db } from 'src/db';
import { signupDtoSchema } from './types/login.dto';
import { eq } from 'drizzle-orm';
import { signToken, verifyToken } from '@km/commonlibs';

@Injectable()
export class LoginModuleService {
    async signup(signupDto: signupDtoSchema) {
        const encryptedPassword =await hashString(signupDto.password);
        return await db.insert(schemaTables.users_login.consumers).values({
            fullName: signupDto.fullName,
            email: signupDto.email,
            phoneNumber: signupDto.phoneNumber,
            passwordHash: encryptedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLoginAt: null,
        }).returning({email:schemaTables.users_login.consumers.email});
    }

    // Implement login logic here
    async login(loginDto: { email: string; password: string }) {
        const user = await db.select().from(schemaTables.users_login.consumers)
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
        return await verifyToken(token,'hehehehe')
        // This method can be used to check if the user is authenticated
        // You can implement your logic here, like checking a session or token
        return { message: 'User is authenticated' };
    }
}
