import { Controller, Get, Param } from '@nestjs/common';
import { meaning2Service } from './meaning2.service';

@Controller()
export class meaning2Controller {
  constructor(private readonly meaning2Service: meaning2Service) {}
  @Get('/english-to-:language-meaning-:word')
  async getcontent(
    @Param('language') language: string,
    @Param('word') word: string,
  ): Promise<any> {
    const result = await this.meaning2Service.getMean(language, word);
    const result_secondary = await this.meaning2Service.getMeanSecondary(
      language,
      word,
    );
    const ss_result = await this.meaning2Service.getSsInformation(word);
    return { result, result_secondary, ss_result };
  }
}
