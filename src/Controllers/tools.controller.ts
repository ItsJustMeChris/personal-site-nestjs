import { Controller, Post, UseGuards } from '@nestjs/common';
import { DeployGuard } from 'src/Guards/deploy.guard';
import * as shell from 'shelljs';
import npm from 'npm';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    shell.exec(
      'cd ~/personal-site-nestjs && git pull && npm run build && systemctl restart api',
    );
    return {
      success: true,
    };
  }
}
