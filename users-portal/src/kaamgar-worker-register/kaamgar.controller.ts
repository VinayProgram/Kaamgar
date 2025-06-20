import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KaamgarRegisterService } from './kaamgar.service';

@Controller('kaamgar-register')
export class KaamgarRegisterController {
  constructor(
    private readonly kaamgarRegisterService: KaamgarRegisterService, // Replace 'any' with the actual service type
  ) {}
  
    @Get(':kaamgarId')
    async getKaamgarDetails(@Param('kaamgarId') kaamgarId: string) {
        return await this.kaamgarRegisterService.getKaamgarDetails(kaamgarId);
    }
}
