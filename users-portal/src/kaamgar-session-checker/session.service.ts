import { Injectable } from '@nestjs/common';
import { verifyToken } from '@km/commonlibs';

@Injectable()
export class SessionService {
    constructor() { }

    public async jwtVerify(token:string) {
         return await verifyToken(token,'YourSecretKeyHere');
    }
}