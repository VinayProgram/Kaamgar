import { Module } from '@nestjs/common';
import { LoginModuleModule } from './kaamgar-worker-login-module/login-module.module';
import { KaamgarRegisterModule } from './kaamgar-worker-register/kaamgar.module';
import { ModuleSession } from './kaamgar-session-checker/session.module';

@Module({
  imports: [LoginModuleModule,KaamgarRegisterModule,ModuleSession],
  controllers: [],
  providers: [],
})
export class AppModule {}
