import { Controller, Post, UseGuards } from '@nestjs/common';
import { exec } from 'child_process';
import { DeployGuard } from 'src/Guards/deploy.guard';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    exec(
      'cd ~/personal-site-nestjs && git pull && npm run build && systemctl restart api',
      function (err, stdout, stderr) {
        console.log(err, stdout, stderr);
      },
    );

    return {
      success: true,
    };
  }
}
