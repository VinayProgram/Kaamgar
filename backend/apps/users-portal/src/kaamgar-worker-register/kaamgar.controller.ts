import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KaamgarRegisterService } from './kaamgar.service';
import { kaamgarRegisterDTO } from './dto/registeration';

@Controller('kaamgar-register')
export class KaamgarRegisterController {
  constructor(
    private readonly kaamgarRegisterService: KaamgarRegisterService, // Replace 'any' with the actual service type
  ) {}
  
  @Post("/")
  async registerKaamgar(@Body() kaamgarData:kaamgarRegisterDTO ) {    
    const result = await this.kaamgarRegisterService.registerKaamgar(kaamgarData);
    return {
      status: "success",
      message: "Kaamgar registered successfully",
      data: result.rows,
    }
  }

  @Get("/check")
  async checkKaamgar() {
    return "heheheheh";
  }

}
