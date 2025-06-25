import { Controller, Get, Req } from '@nestjs/common';
import { SessionService } from './session.service';
import { Request } from 'express';

@Controller('kaamgar-session')
export class sessionWorkerController {
    constructor(
        private readonly sessionService: SessionService
    ){}
    @Get()
    async getSessionStatus(
        @Req() req:Request
    ) {
        const token = req.cookies.authToken;
        console.dir(token,{depth:100})
        return  this.sessionService.jwtVerify(token);
    }
    
}