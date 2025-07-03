import { Module } from '@nestjs/common';
import { LoginModuleModule } from './login-module/login-module.module';
import { AuthModule } from '@app/guards';


@Module({
  imports: [LoginModuleModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
