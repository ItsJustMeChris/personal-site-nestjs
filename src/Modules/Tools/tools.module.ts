import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwt from 'src/Configs/jwt';
import { ToolsController } from 'src/Controllers/tools.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwt],
    }),
  ],
  providers: [],
  controllers: [ToolsController],
})
export class ToolsModule {}
