import { Controller, Get, Param, Injectable, Query, Post, Body, ValidationPipe, UsePipes, Put, Delete, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JsonapiPipe } from '../jsonapi.pipe';

@UsePipes(JsonapiPipe)
@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    async find(@Param('id') id: string) {
       return this.userService.find(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
