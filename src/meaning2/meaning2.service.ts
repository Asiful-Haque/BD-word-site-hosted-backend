import { Injectable } from '@nestjs/common';

@Injectable()
export class meaning2Service {
  async getMean(language: string, word: string): Promise<string> {
    return 'Hello asif';
  }
}
