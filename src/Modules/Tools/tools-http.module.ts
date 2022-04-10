import { Module } from '@nestjs/common';
import { ToolsController } from 'src/Controllers/tools.controller';
import { ToolsModule } from './tools.module';

@Module({
  imports: [ToolsModule],
  providers: [],
  controllers: [ToolsController],
})
export class ToolsHttpModule {}
