import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypeORMExceptionFilter } from 'src/Exceptions/typeorm.exception';
import { CreateUserRequest } from 'src/Requests/user.dto';
import { UsersService } from 'src/Services/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return this.usersService.login(req.user);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(TypeORMExceptionFilter)
  @Post()
  index(@Body() createUserRequest: CreateUserRequest) {
    return this.usersService.register(createUserRequest);
  }
}
