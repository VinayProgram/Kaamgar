import { Module } from '@nestjs/common';
import { KaamgarRegisterController } from './kaamgar.controller';
import { KaamgarRegisterService } from './kaamgar.service';
 

@Module({
  controllers: [KaamgarRegisterController],
  providers: [KaamgarRegisterService],
})
export class KaamgarRegisterModule {}
