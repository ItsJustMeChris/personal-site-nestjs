import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class DeployGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const secretKey = this.configService.get('deploy').secret;

    const hmac = request.headers['x-hub-signature-256'];

    const hash = crypto
      .createHmac('sha256', secretKey)
      .update(request.rawBody)
      .digest('base64');

    if (hmac === hash) {
      return true;
    } else {
      throw new ForbiddenException('Not allowed');
    }
  }
}
