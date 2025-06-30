import { Module } from '@nestjs/common';
import { LoginModuleModule } from './login-module/login-module.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, AuthModule } from '@app/guards';


@Module({
  imports: [LoginModuleModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
