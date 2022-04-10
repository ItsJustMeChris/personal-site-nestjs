import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('tools')
export class ToolsController {
  constructor(private configService: ConfigService) {}
  @Post('deploy')
  async create(@Body('secret') secret: string) {
    if (secret === this.configService.get('deploy').secret) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }
}
