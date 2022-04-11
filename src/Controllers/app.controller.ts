import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return {
      author: 'ItsJustMeChris',
      repository: 'https://github.com/ItsJustMeChris/personal-site-nestjs',
      version: process.env.npm_package_version,
      nodejs: process.version,
    };
  }
}
