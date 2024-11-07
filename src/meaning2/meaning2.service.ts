import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { y_bengali_masters } from 'src/schemas/meaningInitial.schema';

@Injectable()
export class meaning2Service {
  constructor(
    @InjectModel(y_bengali_masters.name)
    private readonly meaning2Model: Model<y_bengali_masters>,
  ) {}

  async getMean(language: string, word: string): Promise<any> {
    const result = await this.meaning2Model.findOne({ word }).exec();

    if (!result) {
      throw new Error('Word not found'); // Handle case when word is not found.
    }

    // Check if 'mean' is present before accessing it.
    if (!result.mean) {
      throw new Error('Mean property is missing');
    }
    return result;
  }

  async getMeanSecondary(language: string, word: string) {
    return "Hi asif"
}
}
