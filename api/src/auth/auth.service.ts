import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthUserDto } from './dto/auth-user.dto.js';
import { Users } from '../users/entities/users.entity.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser && createUserDto.username === existingUser.username) {
      throw new ConflictException(`Username ${createUserDto.username} is not available`);
    }

    if (existingUser && createUserDto.email === existingUser.email) {
      throw new ConflictException(`Email ${createUserDto.email} is already registered`);
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
    const savedUser = await this.usersRepository.save(user);

    return {
      user: this.publicUser(savedUser),
      access_token: await this.createToken(savedUser),
    };
  }

  async authUser(authUserDto: AuthUserDto) {
    const user = await this.usersRepository.findOne({
      where: authUserDto.email
        ? { email: authUserDto.email }
        : { username: authUserDto.username },
    });

    if (!user || !this.verifyPassword(authUserDto.password, user.password)) {
      if (authUserDto.email) {
        throw new UnauthorizedException(`Invalid email or password`);
      }

      if (authUserDto.username) {
        throw new UnauthorizedException(`Invalid username or password`);
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: this.publicUser(user),
      access_token: await this.createToken(user),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  private verifyPassword(password: string, storedPassword: string): boolean {
    const isMatch = bcrypt.compareSync(password, storedPassword);
    if (!isMatch) return false;

    return true;
  }

  private async createToken(user: Users): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + 604800,
    }

    return await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });
  }

  private publicUser(user: Users) {
    const { password: _, ...safeUser } = user;
    
    return safeUser;
  }
}
