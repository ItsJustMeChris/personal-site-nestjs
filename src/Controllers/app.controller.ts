import { Controller, Get } from '@nestjs/common';
import version from 'version';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      author: 'ItsJustMeChris',
      repository: 'https://github.com/ItsJustMeChris/personal-site-nestjs',
      version: version,
      nodejs: process.version,
      ackolwedgements: {
        nestjs: 'https://nestjs.com/',
        trakttv: 'https://trakt.tv/',
        lastfm: 'https://www.last.fm/',
      },
    };
  }
}
