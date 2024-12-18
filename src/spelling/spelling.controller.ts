import { Controller, Get, Query } from '@nestjs/common';
import { spellingService } from './spelling.service';

@Controller('api')
export class spellingController {
  constructor(private readonly spellingService: spellingService) {}

  @Get('suggestions')
  async getSuggestions(@Query('word') word: string) {
    if (!word) {
      return { error: 'No word provided' };
    }

    const suggestions = await this.spellingService.getSuggestions(word);
    return { word, suggestions };
  }
}
