import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwt from 'src/Configs/jwt';
import { PostsController } from 'src/Controllers/posts.controller';
import { Post } from 'src/Entities/Post';
import { PostsService } from 'src/Services/posts.service';
import { S3Service } from 'src/Services/s3.service';
import { JwtStrategy } from 'src/Strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwt],
    }),
    TypeOrmModule.forFeature([Post]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt').secret,
        signOptions: {
          expiresIn: configService.get('jwt').expiresIn,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PostsService, JwtStrategy, S3Service],
  controllers: [PostsController],
})
export class PostsModule {}
