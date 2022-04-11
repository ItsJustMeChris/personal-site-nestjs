import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LastFMTyped from 'lastfm-typed';

@Injectable()
export class LastFMService {
  private lastFM: LastFMTyped;

  constructor(private configService: ConfigService) {
    this.lastFM = new LastFMTyped(this.configService.get('lastfm').apiKey, {
      apiSecret: this.configService.get('lastfm').apiSecret,
      secureConnection: true,
    });
  }

  getRecentTracks() {
    return this.lastFM.user.getRecentTracks(
      this.configService.get('lastfm').username,
    );
  }
}
