import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Trakt from 'trakt.tv';

@Injectable()
export class TraktTVService {
  private trakt: Trakt;

  constructor(private configService: ConfigService) {
    this.trakt = new Trakt({
      client_id: this.configService.get('trakttv').clientId,
      client_secret: this.configService.get('trakttv').clientSecret,
    });
  }

  getWatching() {
    return this.trakt.users.watching({
      username: this.configService.get('trakttv').username,
    });
  }
}
