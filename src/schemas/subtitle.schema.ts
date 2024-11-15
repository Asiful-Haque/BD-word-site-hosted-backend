import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class subtitles extends Document {
  @Prop({ required: true })
  sqlId: number; // Assuming this is the ID of the subtitle

  @Prop({ required: true })
  start_time: string; // Subtitle start time

  @Prop({ required: true })
  end_time: string; // Subtitle end time

  @Prop({ required: true })
  text: string; // The subtitle text

  @Prop({ required: true })
  mname: string; // The name of the media (e.g., show, movie)

  @Prop({ required: true })
  done: number; // If the subtitle is marked as done (perhaps 1 = done)

  @Prop({ required: true })
  mtitle: string; // The title of the media (e.g., episode title)

  @Prop()
  id: number; // ID associated with the subtitle entry
}

export const subtitle_schema = SchemaFactory.createForClass(subtitles);
