import { Module } from '@nestjs/common';
import { LoginModuleModule } from './kaamgar-worker-login-module/login-module.module';

@Module({
  imports: [LoginModuleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
