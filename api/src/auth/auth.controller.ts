import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthUserDto } from './dto/auth-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  authUser(@Body() authUserDto: AuthUserDto) {
    return this.authService.authUser(authUserDto);
  }
}
