import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import deploy from 'src/Configs/deploy';
import lastfm from 'src/Configs/lastfm';
import { ToolsController } from 'src/Controllers/tools.controller';
import { LastFMService } from 'src/Services/lastfm.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [deploy, lastfm],
    }),
  ],
  providers: [LastFMService],
  controllers: [ToolsController],
})
export class ToolsModule {}
