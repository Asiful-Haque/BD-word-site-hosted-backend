import { Controller, Get, Param } from '@nestjs/common';
import { meaningService } from './meaning.service';

@Controller('')
export class meaningController {
  constructor(private readonly meaningService: meaningService) {}

  @Get('/:language/english-to-:language-meaning-:word')
  async getContents(
    @Param('language') language: string,
    @Param('word') word: string,
  ): Promise<{
    meaning: string;
  }> {
    const meaning = await this.meaningService.getMeaning(language, word);
    return { meaning };
  }
}
