import { Controller, Get } from '@nestjs/common';
import version from 'src/version';

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
        nodejs: 'https://nodejs.org/',
        trakttv: 'https://trakt.tv/',
        lastfm: 'https://last.fm/',
      },
      donate: {
        'Slava Ukraini':
          'https://reddit.com/r/ukraine/comments/s6g5un/want_to_support_ukraine_heres_a_list_of_charities/',
        'heart.org': 'https://heart.org/donate/',
        'nokidhungry.org': 'https://nokidhungry.org/',
        save_the_earth:
          'https://www.effectiveenvironmentalism.org/climate-charities',
        crypto: 'https://thegivingblock.com/',
      },
      stop: 'war',
    };
  }
}
