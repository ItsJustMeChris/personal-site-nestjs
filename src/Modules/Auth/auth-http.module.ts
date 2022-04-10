import { Module } from '@nestjs/common';
import { AuthController } from 'src/Controllers/auth.controller';
import { UsersService } from 'src/Services/users.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  providers: [UsersService],
  controllers: [AuthController],
})
export class AuthenticationHttpModule {}
