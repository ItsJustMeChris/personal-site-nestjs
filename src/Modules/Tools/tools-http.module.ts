import { Module } from '@nestjs/common';
import { ToolsController } from 'src/Controllers/tools.controller';
import { LastFMService } from 'src/Services/lastfm.service';
import { TraktTVService } from 'src/Services/trakttv.service';
import { ToolsModule } from './tools.module';

@Module({
  imports: [ToolsModule],
  providers: [LastFMService, TraktTVService],
  controllers: [ToolsController],
})
export class ToolsHttpModule {}
