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

    console.log(request.rawBody);
    console.log('key', secretKey);
    console.log('hmac', hmac);

    const sig =
      'sha256=' +
      crypto
        .createHmac('sha256', secretKey)
        .update(request.rawBody.toString())
        .digest('hex');

    if (hmac === sig) {
      console.log('valid');
      return true;
    } else {
      console.log('false');
      throw new ForbiddenException('Not allowed');
    }
  }
}
