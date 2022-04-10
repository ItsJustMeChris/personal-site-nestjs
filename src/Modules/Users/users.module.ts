import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwt from 'src/Configs/jwt';
import { UsersController } from 'src/Controllers/users.controller';
import { User } from 'src/Entities/User';
import { UsersService } from 'src/Services/users.service';
import { JwtStrategy } from 'src/Strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwt],
    }),
    TypeOrmModule.forFeature([User]),
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
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
