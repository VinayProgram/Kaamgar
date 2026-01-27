import { Module } from '@nestjs/common';
import { LoginModuleModule } from './login-module/login-module.module';
import { AuthModule } from '@app/guards';
import { DatabaseConnectionModule } from './db/database-connection.module';


@Module({
  imports: [DatabaseConnectionModule, LoginModuleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
