import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { meaningModule } from './meaning/meaning.module';
import { meaning2Module } from './meaning2/meaning2.module';
import { spellingModule } from './spelling/spelling.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes configuration available globally
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // meaningModule,
    meaning2Module,
    spellingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
