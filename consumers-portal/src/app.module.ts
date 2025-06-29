import { Module } from '@nestjs/common';
import { LoginModuleModule } from './login-module/login-module.module';


@Module({
  imports: [LoginModuleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
