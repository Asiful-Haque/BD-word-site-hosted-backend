import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { y_bengali_masters } from 'src/schemas/meaningInitial.schema';
import { v3_word_phrase_ } from 'src/schemas/meaningSecondary.schema';

@Injectable()
export class meaning2Service {
  constructor(
    @InjectModel(y_bengali_masters.name)
    private readonly meaning2Model: Model<y_bengali_masters>,
    @InjectModel(v3_word_phrase_.name)
    private readonly meaning2ModelSecondary: Model<v3_word_phrase_>,
  ) {}

  async getMean(language: string, word: string): Promise<any> {
    const result = await this.meaning2Model.findOne({ word }).exec();

    if (!result) {
      throw new Error('Word not found');
    }
    if (!result.mean) {
      throw new Error('Mean property is missing');
    }
    return result;
  }

  async getMeanSecondary(language: string, word: string): Promise<any> {
    const result = await this.meaning2ModelSecondary.findOne({ word }).exec();

    if (!result) {
      throw new Error('Data not came from the backend');
    }
    return result;
  }
}
