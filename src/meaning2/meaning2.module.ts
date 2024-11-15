import { Module } from '@nestjs/common';
import { meaning2Controller } from './meaning2.controller';
import { meaning2Service } from './meaning2.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  y_bengali_masters,
  meaning2Schema,
} from 'src/schemas/meaningInitial.schema';
import {
  meaning2SchemaSecondary,
  v3_word_phrase_,
} from 'src/schemas/meaningSecondary.schema';
import {
  dict_word_lists,
  dict_word_list_schema,
} from 'src/schemas/dict_word_list.schema';
import { subtitles, subtitle_schema } from 'src/schemas/subtitle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: y_bengali_masters.name, schema: meaning2Schema },
      { name: v3_word_phrase_.name, schema: meaning2SchemaSecondary },
      { name: subtitles.name, schema: subtitle_schema },
      { name: dict_word_lists.name, schema: dict_word_list_schema },
    ]),
  ],
  controllers: [meaning2Controller],
  providers: [meaning2Service],
})
export class meaning2Module {}
