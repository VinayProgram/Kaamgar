import { Module } from '@nestjs/common';
import { LoginModuleModule } from './kaamgar-worker-login-module/login-module.module';
import { KaamgarRegisterModule } from './kaamgar-worker-register/kaamgar.module';
import { ModuleSession } from './kaamgar-session-checker/session.module';
import { DatabaseConnectionModule } from './db/database-connection.module';

@Module({
  imports: [DatabaseConnectionModule, LoginModuleModule, KaamgarRegisterModule, ModuleSession],

  controllers: [],
  providers: [],
})
export class AppModule { }
