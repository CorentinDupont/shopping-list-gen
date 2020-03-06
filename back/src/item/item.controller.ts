import { Controller, Get, Param, Injectable, Query, Post, Body, ValidationPipe, UsePipes, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemController {

    constructor(private readonly itemService: ItemService) {}

    @Post()
    async create(@Body() createItemDto: CreateItemDto, @Req() req: any): Promise<Item> {
      console.log(createItemDto)
      console.log(req.body, req.params, req.data);
      return this.itemService.create(createItemDto);
    }

    @Get(':id')
    async find(@Param('id') id: string) {
       return this.itemService.find(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.itemService.delete(id);
    }

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemService.findAll();
    }
}
