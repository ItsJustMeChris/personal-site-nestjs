import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import deploy from 'src/Configs/deploy';
import { ToolsController } from 'src/Controllers/tools.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [deploy],
    }),
  ],
  providers: [],
  controllers: [ToolsController],
})
export class ToolsModule {}
