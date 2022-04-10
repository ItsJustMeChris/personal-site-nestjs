import { Controller, Post, UseGuards } from '@nestjs/common';
import { DeployGuard } from 'src/Guards/deploy.guard';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  async create() {
    console.log('testing');

    return {
      success: true,
    };
  }
}
