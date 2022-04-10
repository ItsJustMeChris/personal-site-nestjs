import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      endpoint: this.configService.get('s3').endpoint,
      secretAccessKey: this.configService.get('s3').secret,
      accessKeyId: this.configService.get('s3').accessKey,
      signatureVersion: 'v4',
    });
  }

  getPresignedURL(key: string) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.configService.get('s3').bucket,
      Key: key,
      Expires: 100,
    });
  }

  getObject(key: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.configService.get('s3').bucket,
      Key: key,
      Expires: 100,
    });
  }
}
