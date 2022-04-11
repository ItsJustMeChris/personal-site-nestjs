import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import deploy from 'src/Configs/deploy';
import lastfm from 'src/Configs/lastfm';
import trakttv from 'src/Configs/trakttv';
import { ToolsController } from 'src/Controllers/tools.controller';
import { LastFMService } from 'src/Services/lastfm.service';
import { TraktTVService } from 'src/Services/trakttv.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [deploy, lastfm, trakttv],
    }),
  ],
  providers: [LastFMService, TraktTVService],
  controllers: [ToolsController],
})
export class ToolsModule {}
