import { Controller, Get } from '@nestjs/common';
import { LastFMService } from 'src/Services/lastfm.service';
import { TraktTVService } from 'src/Services/trakttv.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private lastFMService: LastFMService,
    private traktTVService: TraktTVService,
  ) {}

  @Get('lastfm')
  lastfm() {
    return this.lastFMService.getRecentTracks();
  }

  @Get('trakttv')
  trakttv() {
    return this.traktTVService.getWatching();
  }
}
