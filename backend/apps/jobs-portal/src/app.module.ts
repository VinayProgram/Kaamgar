import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [JobsModule, AlertsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
