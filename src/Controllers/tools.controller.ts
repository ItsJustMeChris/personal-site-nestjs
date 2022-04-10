import { Controller, Headers, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import * as rawBody from 'raw-body';

@Controller('tools')
export class ToolsController {
  constructor(private configService: ConfigService) {}
  @Post('deploy')
  async create(
    @Headers('X-Hub-Signature-256') webhookSecret: string,
    @Req() req,
  ) {
    console.log('testing');
    const sig = Buffer.from(webhookSecret, 'utf8');
    const hmac = createHmac('sha256', this.configService.get('deploy').secret);

    const body = (await rawBody(req)).toString('utf8').trim();

    const digest = Buffer.from(
      'sha256=' + hmac.update(body).digest('hex'),
      'utf8',
    );
    if (sig.length !== digest.length || !timingSafeEqual(digest, sig)) {
      console.log('not safe');
      return {
        success: false,
      };
    }

    console.log('safe');

    return {
      success: true,
    };
  }
}
