import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DeployGuard } from 'src/Guards/deploy.guard';
import { exec } from 'child_process';
import { LastFMService } from 'src/Services/lastfm.service';
import { TraktTVService } from 'src/Services/trakttv.service';

@Controller('tools')
export class ToolsController {
  constructor(
    private lastFMService: LastFMService,
    private traktTVService: TraktTVService,
  ) {}

  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    exec(
      'cd ~/personal-site-nestjs && git pull && npm run build && systemctl restart api',
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
      },
    );
    return {
      success: true,
    };
  }

  @Get('lastfm')
  lastfm() {
    return this.lastFMService.getRecentTracks();
  }

  @Get('trakttv')
  trakttv() {
    return this.traktTVService.getWatching();
  }
}
