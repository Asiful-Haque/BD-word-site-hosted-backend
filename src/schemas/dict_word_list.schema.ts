import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class dict_word_lists extends Document {
  @Prop({ required: true })
  sqlId: number; // Unique ID for the word entry

  @Prop({ required: true })
  sid: number; // Reference to another collection, like SubtitleEntry

  @Prop({ required: true })
  word: string; // The word itself
}

export const dict_word_list_schema =
  SchemaFactory.createForClass(dict_word_lists);
