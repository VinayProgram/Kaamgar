import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { AlertsResolver } from './alerts.resolver';

@Module({
  controllers: [AlertsController],
  providers: [AlertsService,AlertsResolver],
})
export class AlertsModule {}
