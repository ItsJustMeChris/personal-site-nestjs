import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import s3 from 'src/Configs/s3';
import { UploadsController } from 'src/Controllers/uploads.controller';
import { User } from 'src/Entities/User';
import { S3Service } from 'src/Services/s3.service';
import { JwtStrategy } from 'src/Strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [s3],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [S3Service, JwtStrategy],
  controllers: [UploadsController],
})
export class UploadsModule {}
