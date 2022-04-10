import { Module } from '@nestjs/common';
import { UsersController } from 'src/Controllers/users.controller';
import { UsersService } from 'src/Services/users.service';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UserHttpModule {}
