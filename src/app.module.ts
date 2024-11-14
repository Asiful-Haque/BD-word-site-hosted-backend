import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { meaningModule } from './meaning/meaning.module';
import { meaning2Module } from './meaning2/meaning2.module';
import { spellingModule } from './spelling/spelling.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/urdus_'),
    meaningModule,
    meaning2Module,
    spellingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
