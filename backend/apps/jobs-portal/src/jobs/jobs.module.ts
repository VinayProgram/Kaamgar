import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsResolver } from './jobs.resolver';

@Module({
  controllers: [JobsController],
  providers: [JobsResolver,JobsService],

})
export class JobsModule {}
