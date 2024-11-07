import { Module } from '@nestjs/common';
import { meaning2Controller } from './meaning2.controller';
import { meaning2Service } from './meaning2.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  y_bengali_masters,
  meaning2Schema,
} from 'src/schemas/meaningInitial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: y_bengali_masters.name, schema: meaning2Schema },
    ]),
  ],
  controllers: [meaning2Controller],
  providers: [meaning2Service],
})
export class meaning2Module {}
