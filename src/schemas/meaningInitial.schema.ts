import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class y_bengali_masters extends Document {
  @Prop()
  id: number;

  @Prop()
  word: string;

  // Define 'details' as an object with a known 'result' field and any additional properties
  @Prop({
    type: {
      result: { type: String }, // Known field in details
      additional: { type: MongooseSchema.Types.Mixed }, // Correctly use MongooseSchema.Types.Mixed
    },
    default: {},
  })
  details: {
    result: string;
    additional?: Record<string, any>; // Allows any additional fields in 'details'
  };

  @Prop()
  mean: string;

  @Prop()
  nex: string;

  @Prop()
  prev: string;

  @Prop()
  height: number;

  @Prop()
  width: number;
}

export const meaning2Schema = SchemaFactory.createForClass(y_bengali_masters);
