import { Controller, Post, UseGuards } from '@nestjs/common';
import { DeployGuard } from 'src/Guards/deploy.guard';
import { exec } from 'child_process';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    exec(
      'cd ~/personal-site-nestjs && git pull && npm i && npm run build && systemctl restart api',
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
      },
    );
    return {
      success: true,
    };
  }
}
