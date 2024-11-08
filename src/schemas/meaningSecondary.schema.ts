import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class v3_word_phrase_ extends Document {
  @Prop()
  id: number;

  @Prop()
  word: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  bengali: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  data: Record<string, any>;

  @Prop()
  alls: string;

  @Prop()
  synonym2: string;
}
export const meaning2SchemaSecondary =
  SchemaFactory.createForClass(v3_word_phrase_);
