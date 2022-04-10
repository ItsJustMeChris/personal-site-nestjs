import { Body, Controller, Header, Headers, Post, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import { Request } from 'express';

import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import * as rawBody from 'raw-body';

export const PlainBody = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<import('express').Request>();
    if (!req.readable) {
      throw new BadRequestException('Invalid body');
    }

    const body = (await rawBody(req)).toString('utf8').trim();
    return body;
  },
);

@Controller('tools')
export class ToolsController {
  constructor(private configService: ConfigService) {}
  @Post('deploy')
  async create(
    @Headers('X-Hub-Signature-256') webhookSecret: string,
    @PlainBody() body,
  ) {
    console.log('testing');
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
