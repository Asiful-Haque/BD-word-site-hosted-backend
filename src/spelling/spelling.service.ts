import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class spellingService {
  getSuggestions(word: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      exec(`echo "${word}" | aspell -a --lang=en_US`, (error, stdout) => {
        if (error) {
          return reject('Error in spell check');
        }
        const suggestions = stdout ? stdout.trim().split('\n') : [];
        resolve(suggestions);
      });
    });
  }
}
