import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LanguageEntrySchema } from 'src/schemas/language.schema';

// import Hero from 'src/schemas/heros.schema';

@Injectable()
export class meaningService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  private getLanguageModel(language: string): mongoose.Model<any> {
    const collectionName = `${language.toLowerCase()}s`;
    return this.connection.model(collectionName, LanguageEntrySchema);
  }
  async getMeaning(language: string, word: string): Promise<string> {
    const languageSchemaModel = this.getLanguageModel(language);
    console.log(language, word);
    console.log('model is', languageSchemaModel);
    const result = await languageSchemaModel.findOne({ word: word }).exec();
    console.log(
      `Result found for the word "${word}" in language "${language}".`,
    );

    if (!result) {
      return `No result found for the word "${word}" in language "${language}".`;
    }
    return result.trans;
  }

  // async shuffledSentences(language: string, word: string): Promise<string[]> {
  //   const languageSchemaModel = this.getLanguageModel(language);
  //   const result = await languageSchemaModel.findOne({ word: word }).exec();
  //   if (!result || !result.sentences) {
  //     return []; // Return an empty array if no result or sentences found
  //   }
  //   return this.shuffleArray(result.sentences);
  // }
  // shuffleArray(array: string[]): string[] {
  //   // Fisher-Yates Shuffle algorithm
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }
}
