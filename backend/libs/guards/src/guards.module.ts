import { Module } from '@nestjs/common';
import { AuthGuard } from './guards.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardsModule {}


@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
