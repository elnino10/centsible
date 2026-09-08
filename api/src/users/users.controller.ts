import { Body, Controller, Get, Param, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    // GET /
    @Get()
    getUsers(@Query('index') index = 1, @Query('limit') limit = 10) {
        return this.usersService.getUsers(index, limit);
    }

    // GET /:id
    @Get(':id')
    getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.getUserById(id);
    }

    // PUT /:userId
    @Put(':id')
    updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    // DELETE /:userId
    // deleteUser()
}
