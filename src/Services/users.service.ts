import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/Entities/User';
import { CreateUserRequest } from 'src/Requests/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(user: CreateUserRequest): Promise<User> {
    return this.usersRepository.save(user as unknown as User);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: [{ email: username }, { username: username }],
    });

    if (compareSync(password, user.password)) {
      return user;
    }
    return undefined;
  }

  login(user: User) {
    if (!user.isActive) {
      return {
        success: false,
      };
    }

    const payload = { user: instanceToPlain(user), sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: CreateUserRequest) {
    const user = await this.usersRepository.save(data as unknown as User);
    if (user) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
