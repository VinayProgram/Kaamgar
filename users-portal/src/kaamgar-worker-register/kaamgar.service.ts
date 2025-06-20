import { Injectable } from '@nestjs/common';

@Injectable()
export class KaamgarRegisterService {
    constructor() { }
    public async healthCheck(): Promise<any> {
        try {
            return 'Hello :)';
        }
        catch (error: any) {
            throw error
        }
    }
}