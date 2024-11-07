import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { meaningController } from './meaning.controller';
import { meaningService } from './meaning.service';
import { word_of_the_days, WotdSchema } from 'src/schemas/Wot.schema';

@Module({
  imports: [
    //It tells mongoose to create a model named word_of_the_days from word_of_the_days.name
    // based on the WotdSchema
    MongooseModule.forFeature([
      { name: word_of_the_days.name, schema: WotdSchema },
    ]),
  ],
  controllers: [meaningController],
  providers: [meaningService],
})
export class meaningModule {}
