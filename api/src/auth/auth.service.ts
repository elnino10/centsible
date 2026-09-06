import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthUserDto } from './dto/auth-user.dto.js';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  authUser(authUserDto: AuthUserDto) {
    return `authenticated user data: \n${authUserDto}`;
  }
}
