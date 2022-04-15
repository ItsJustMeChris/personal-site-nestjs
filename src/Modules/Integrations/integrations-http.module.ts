import { Module } from '@nestjs/common';
import { IntegrationsController } from 'src/Controllers/integrations.controller';
import { LastFMService } from 'src/Services/lastfm.service';
import { TraktTVService } from 'src/Services/trakttv.service';
import { IntegrationsModule } from './integrations.module';

@Module({
  imports: [IntegrationsModule],
  providers: [LastFMService, TraktTVService],
  controllers: [IntegrationsController],
})
export class IntegrationsHttpModule {}
