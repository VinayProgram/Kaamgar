import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';

@Controller('login-module')
export class LoginModuleController {
  constructor(private readonly loginModuleService: LoginModuleService) {}

  

}
