import { Controller, Post, UseGuards } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import { DeployGuard } from 'src/Guards/deploy.guard';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    spawn(
      'cd ~/personal-site-nestjs && git pull && npm run build && systemctl restart api',
      {},
    );

    return {
      success: true,
    };
  }
}
