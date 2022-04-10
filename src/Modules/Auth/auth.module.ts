import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwt from 'src/Configs/jwt';
import { AuthController } from 'src/Controllers/auth.controller';
import { User } from 'src/Entities/User';
import { UsersService } from 'src/Services/users.service';
import { LocalStrategy } from 'src/Strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwt],
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
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
  providers: [UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
