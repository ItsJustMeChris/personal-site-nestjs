import { Controller, Post, UseGuards } from '@nestjs/common';
import { DeployGuard } from 'src/Guards/deploy.guard';
import * as shell from 'shelljs';
import npm from 'npm';

@Controller('tools')
export class ToolsController {
  @UseGuards(DeployGuard)
  @Post('deploy')
  deploy() {
    shell.exec('cd ~/personal-site-nestjs && git pull');
    npm.commands.exec(
      ['build'],
      (err: Error, result: any, result2: any, result3: any, result4: any) => {
        console.log(err, result, result2, result3, result4);
        shell.exec('systemctl restart api');
      },
    );
    return {
      success: true,
    };
  }
}
