import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      author: 'ItsJustMeChris',
      repository: 'https://github.com/ItsJustMeChris/personal-site-nestjs',
      version: '1.2.0',
      nodejs: process.version,
      ackolwedgements: {
        nestjs: 'https://nestjs.com/',
        trakttv: 'https://trakt.tv/',
        lastfm: 'https://www.last.fm/',
      },
    };
  }
}
