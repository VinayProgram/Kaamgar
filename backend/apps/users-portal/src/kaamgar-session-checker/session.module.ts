import { Module, Global } from '@nestjs/common';
import { sessionWorkerController } from './session.worker.controller';
import { SessionService } from './session.service';

@Global()
@Module({
    controllers: [sessionWorkerController],
    providers: [SessionService],
})
export class ModuleSession {};