import { Module } from '@nestjs/common';
import { UploadsController } from 'src/Controllers/uploads.controller';
import { S3Service } from 'src/Services/s3.service';
import { UploadsModule } from './uploads.module';

@Module({
  imports: [UploadsModule],
  providers: [S3Service],
  controllers: [UploadsController],
})
export class UploadsHttpModule {}
