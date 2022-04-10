import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Guards/jwt.guard';
import { S3Service } from 'src/Services/s3.service';

@Controller('uploads')
export class UploadsController {
  constructor(private s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  index(@Body('key') key: string) {
    return {
      url: this.s3Service.getPresignedURL(key),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Query('key') key: string) {
    return {
      url: this.s3Service.getObject(key),
    };
  }
}
