import { Body, Controller, Get, Param, Query, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    // GET /
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUsers(@Query('index') index = 1, @Query('limit') limit = 10) {
        return this.usersService.getUsers(index, limit);
    }

    // GET /:id
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.getUserById(id);
    }

    // PUT /:userId
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    // DELETE /:userId
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.deleteUser(id);
    }
}
