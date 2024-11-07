import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LanguageEntry extends Document {
  @Prop({ required: true })
  sqlId: number;

  @Prop({ required: true, index: true })
  word: string;

  @Prop()
  gptans: string;

  @Prop()
  trans: string;

  @Prop()
  restriction: string;

  @Prop({ required: true })
  language: string;

  @Prop([String])
  synonyms: string[];

  @Prop([String])
  sentences: string[];

  @Prop([
    {
      subs: { type: String },
      series_season_episode: { type: String },
      start_time: { type: String },
      end_time: { type: String },
    },
  ])
  subtitles: {
    subs: string;
    series_season_episode: string;
    start_time: string;
    end_time: string;
  }[];

  @Prop([String])
  randomWordSql: string[];

  @Prop()
  restricted: string;
}

export const LanguageEntrySchema = SchemaFactory.createForClass(LanguageEntry);
