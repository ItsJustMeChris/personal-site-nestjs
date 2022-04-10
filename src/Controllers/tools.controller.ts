import { Body, Controller, Header, Headers, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import { Request } from 'express';

@Controller('tools')
export class ToolsController {
  constructor(private configService: ConfigService) {}
  @Post('deploy')
  async create(
    @Headers('X-Hub-Signature-256') webhookSecret: string,
    @Body() body,
  ) {
    const sig = Buffer.from(webhookSecret, 'utf8');
    const hmac = createHmac('sha256', this.configService.get('deploy').secret);

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
