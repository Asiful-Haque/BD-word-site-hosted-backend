import { Module } from '@nestjs/common';
import { meaning2Controller } from './meaning2.controller';
import { meaning2Service } from './meaning2.service';

@Module({
  imports: [],
  controllers: [meaning2Controller],
  providers: [meaning2Service],
})
export class meaning2Module {}
