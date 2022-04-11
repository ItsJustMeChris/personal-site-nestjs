import { Controller, Post, UseGuards } from '@nestjs/common';
import { DeployGuard } from 'src/Guards/deploy.guard';
import * as shell from 'shelljs';
import npm from 'npm';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    shell.exec('npm run deploy');
    return {
      success: true,
    };
  }
}
