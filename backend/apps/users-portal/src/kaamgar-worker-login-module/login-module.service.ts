import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { schemaTables } from '../common/importHelpers';
import { compareHash, signToken } from 'libs/encryption';


@Injectable()
export class LoginModuleService {
    constructor() {}

    async login(payload: { email: string; password: string }){
        payload.email = payload.email.toLowerCase().trim();
        const data = await db.select().from(schemaTables.users_login.kaamgarUsers).where(eq(schemaTables.users_login.kaamgarUsers.email,payload.email))
        if(data.length === 0) {
            return {
                status: "error",
                message: "User not found",
                data: null
            };
        }
        const user = data[0];
        const isPasswordValid = await compareHash(payload.password, user.passwordHash);
        if (!isPasswordValid) {
            return {
                status: "error",
                message: "Invalid Username or Password",
                data: null
            };
        }
        const jwt = await signToken({
            email: user.email,
            userType: user.userType,
            isVerified: user.isVerified,
            id: user.id
        },
        "YourSecretKeyHere",
    )
        return {
            status: "success",
            message: "Login successful",
            data: {
                email: user.email,
                token: jwt, // In a real application, generate a JWT token here
            }
        };  
    }

}
