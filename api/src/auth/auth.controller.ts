import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthUserDto } from './dto/auth-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  authUser(@Body() authUserDto: AuthUserDto) {
    return this.authService.authUser(authUserDto);
  }
}
