import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): { author: string } {
    return {
      author: 'ItsJustMeChris',
    };
  }
}
