import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      author: 'ItsJustMeChris',
      repository: 'https://github.com/ItsJustMeChris/personal-site-nestjs',
      version: '1.0.0',
      nodejs: process.version,
    };
  }
}
