import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';

@Controller('login-module')
export class LoginModuleController {
  constructor(private readonly loginModuleService: LoginModuleService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.loginModuleService.login(body);
  }
  

}
