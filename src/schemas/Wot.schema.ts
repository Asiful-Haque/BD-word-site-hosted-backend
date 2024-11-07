import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class word_of_the_days extends Document {
  @Prop({ required: true })
  sqlId: number;

  @Prop({ required: true })
  word: string;

  @Prop({ required: true, index: true })
  date: string;
}

export const WotdSchema = SchemaFactory.createForClass(word_of_the_days);
