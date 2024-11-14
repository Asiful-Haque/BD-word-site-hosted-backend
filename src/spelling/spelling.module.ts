import { Module } from '@nestjs/common';
import { spellingService } from './spelling.service';
import { spellingController } from './spelling.controller';

@Module({
  providers: [spellingService],
  controllers: [spellingController],
})
export class spellingModule {}
