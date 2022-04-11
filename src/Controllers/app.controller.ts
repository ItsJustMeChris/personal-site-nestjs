import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): { author: string; test: string } {
    return {
      author: 'ItsJustMeChris',
      test: 'ing',
    };
  }
}
