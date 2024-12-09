import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { dict_word_lists } from 'src/schemas/dict_word_list.schema';
import { y_bengali_masters } from 'src/schemas/meaningInitial.schema';
import { v3_word_phrase_ } from 'src/schemas/meaningSecondary.schema';
import { subtitles } from 'src/schemas/subtitle.schema';

@Injectable()
export class meaning2Service {
  constructor(
    @InjectModel(y_bengali_masters.name)
    private readonly meaning2Model: Model<y_bengali_masters>,
    @InjectModel(v3_word_phrase_.name)
    private readonly meaning2ModelSecondary: Model<v3_word_phrase_>,
    @InjectModel(subtitles.name)
    private readonly subtitleModel: Model<subtitles>,
    @InjectModel(dict_word_lists.name)
    private readonly dict_word_listModel: Model<dict_word_lists>,
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
    // const matchStage = await this.meaning2ModelSecondary.aggregate([
    //   { $match: { word: { $regex: `^${word}$`, $options: 'i' } } },
    // ]);
    // console.log('Match Stage Results:', matchStage);

    const result = await this.meaning2ModelSecondary.findOne({ word }).exec();

    if (!result) {
      throw new Error('Data not came from the backend');
    }
    return result;
  }

  async getSsInformation(word: string) {
    const results = await this.dict_word_listModel.aggregate([
      {
        $match: { word }, // Match the specific word in `dict_word_list`
      },
      {
        $lookup: {
          from: 'subtitles', // Collection name for `subtitle`
          localField: 'sid', // Field in `dict_word_list` that references `subtitle`
          foreignField: 'id', // Field in `subtitle` that `sid` corresponds to
          as: 'subtitleInfo', // Output field for joined data
        },
      },
      {
        $unwind: '$subtitleInfo', // Flatten the array of `subtitleInfo` documents
      },
      {
        $project: {
          word: 1, // Include `word` from `dict_word_list`
          'subtitleInfo.end_time': 1, // Include `end_time` from `subtitle`
          'subtitleInfo.text': 1, // Include `text` from `subtitle`
          'subtitleInfo.mname': 1, // Include `mname` from `subtitle`
          'subtitleInfo.mtitle': 1, // Include `mtitle` from `subtitle`
        },
      },
      {
        $sample: { size: 5 }, // Randomize and limit the results to 5
      },
    ]);

    // if (!results.length) {
    //   throw new Error('No data found for the given word');
    // }

    return results;
  }
}
