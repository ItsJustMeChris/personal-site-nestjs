import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/Entities/User';
import { UsersService } from 'src/Services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
