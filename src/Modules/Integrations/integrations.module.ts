import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import lastfm from 'src/Configs/lastfm';
import trakttv from 'src/Configs/trakttv';
import { IntegrationsController } from 'src/Controllers/integrations.controller';
import { LastFMService } from 'src/Services/lastfm.service';
import { TraktTVService } from 'src/Services/trakttv.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [lastfm, trakttv],
    }),
  ],
  providers: [LastFMService, TraktTVService],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
