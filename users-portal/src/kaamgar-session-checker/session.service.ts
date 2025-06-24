import { Injectable } from '@nestjs/common';
import { verifyToken } from 'src/common/jwt';

@Injectable()
export class SessionService {
    constructor() { }

    public async jwtVerify(token:string) {
         return await verifyToken(token)
    }
}