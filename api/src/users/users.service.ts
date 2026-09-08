import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sanitizeData } from '../helpers/functions.helpers.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }

    async getUsers(index: number, limit: number): Promise<UserResponseDto[] | any[]> {
        const skip = (index - 1) * limit;
        const users = await this.usersRepository.find({
            skip,
            take: limit,
        });
        const sanitizedUsers = sanitizeData(users);
        return sanitizedUsers as any[];
    }

    async getUserById(id: string): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        const sanitizedUser = sanitizeData(user);
        return sanitizedUser as UserResponseDto;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        Object.assign(user, updateUserDto);
        const updatedUser = await this.usersRepository.save(user);
        const sanitizedUser = sanitizeData(updatedUser);
        return sanitizedUser as UserResponseDto;
    }
}
