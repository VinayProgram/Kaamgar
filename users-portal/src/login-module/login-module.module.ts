import { Module } from '@nestjs/common';
import { LoginModuleService } from './login-module.service';
import { LoginModuleController } from './login-module.controller';

@Module({
  controllers: [LoginModuleController],
  providers: [LoginModuleService],
})
export class LoginModuleModule {}
