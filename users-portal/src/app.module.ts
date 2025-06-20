import { Module } from '@nestjs/common';
import { LoginModuleModule } from './kaamgar-worker-login-module/login-module.module';
import { KaamgarRegisterModule } from './kaamgar-worker-register/kaamgar.module';

@Module({
  imports: [LoginModuleModule,KaamgarRegisterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
