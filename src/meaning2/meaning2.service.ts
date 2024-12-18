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

  async getAggregatedMeanData(language: string, word: string): Promise<any> {
    const aggregationResult = await this.meaning2Model.aggregate([
      // Step 1: Match the word
      { $match: { word } },

      // Step 2: Lookup for secondary meaning
      {
        $lookup: {
          from: 'v3_word_phrase_',
          localField: 'word',
          foreignField: 'word',
          as: 'meaningSecondaryInfo',
        },
      },

      // Step 3: Lookup for `dictInfo` and randomize
      {
        $lookup: {
          from: 'dict_word_lists',
          let: { wordValue: '$word' },
          pipeline: [
            { $match: { $expr: { $eq: ['$word', '$$wordValue'] } } },
            { $addFields: { randomValue: { $rand: {} } } },
            { $sort: { randomValue: 1 } },
            { $limit: 5 },
          ],
          as: 'dictInfo',
        },
      },

      // Step 4: Lookup for `subtitles` using extracted `sid`
      {
        $lookup: {
          from: 'subtitles',
          let: { sidList: '$dictInfo.sid' },
          pipeline: [
            { $match: { $expr: { $in: ['$id', '$$sidList'] } } },
            { $project: { _id: 0, end_time: 1, text: 1, mname: 1, mtitle: 1 } },
          ],
          as: 'subtitleInfo',
        },
      },

      // Step 5: Group results
      {
        $group: {
          _id: '$_id',
          word: { $first: '$word' },
          meaningPrimaryInfo: {
            $first: {
              word: '$word',
              details: '$details',
              mean: '$mean',
              nex: '$nex',
              prev: '$prev',
              height: '$height',
              width: '$width',
            },
          },
          meaningSecondaryInfo: {
            $first: { $arrayElemAt: ['$meaningSecondaryInfo', 0] },
          },
          subtitleInfo: { $first: '$subtitleInfo' },
        },
      },

      // Step 6: Project the final result
      {
        $project: {
          _id: 0,
          word: 1,
          meaningPrimaryInfo: 1,
          meaningSecondaryInfo: 1,
          subtitleInfo: 1,
        },
      },

      // Step 7: Limit to 1 result
      { $limit: 1 },
    ]);

    if (!aggregationResult || aggregationResult.length === 0) {
      throw new Error('No data found for the given word');
    }

    // Wrap the result in { result: ... }
    return aggregationResult[0];
  }
}
