import { Controller, Post, UseGuards } from '@nestjs/common';
import { exec } from 'child_process';
import { DeployGuard } from 'src/Guards/deploy.guard';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    exec('sh ~/personal-site-nestjs/update.sh', function (err, stdout, stderr) {
      console.log(err, stdout, stderr);
    });

    return {
      success: true,
    };
  }
}
