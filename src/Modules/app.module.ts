import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entities/User';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from '../Configs/database';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { Post } from 'src/Entities/Post';
import { PostsModule } from './Posts/posts.module';
import { UploadsModule } from './Uploads/uploads.module';
import { ToolsModule } from './Tools/tools.module';
import { IntegrationsController } from 'src/Controllers/integrations.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database').host,
        port: configService.get('database').port,
        username: configService.get('database').username,
        password: configService.get('database').password,
        database: configService.get('database').dbname,
        entities: [User, Post],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    PostsModule,
    UploadsModule,
    ToolsModule,
    IntegrationsController,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
