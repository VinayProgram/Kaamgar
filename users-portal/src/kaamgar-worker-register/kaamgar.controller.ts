import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KaamgarRegisterService } from './kaamgar.service';
import { schemaTables } from 'src/common/importHelpers';
import { kaamgarRegisterDTO } from './dto/registeration';

@Controller('kaamgar-register')
export class KaamgarRegisterController {
  constructor(
    private readonly kaamgarRegisterService: KaamgarRegisterService, // Replace 'any' with the actual service type
  ) {}
  
  @Post("/")
  async registerKaamgar(@Body() kaamgarData:kaamgarRegisterDTO ) {    
    return this.kaamgarRegisterService.registerKaamgar(kaamgarData);
  }

  @Get("/check")
  async checkKaamgar() {
    return "heheheheh";
  }

}
