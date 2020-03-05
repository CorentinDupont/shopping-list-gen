import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {

    constructor(
        @InjectModel('Item') private readonly itemModel: Model<Item>,
    ) {}

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async update(id: string, updateItemDto: UpdateItemDto) {
        return this.itemModel.updateOne({ _id: id }, { ...updateItemDto, updatedAt: new Date()});
    }

    async delete(id: string) {
        return this.itemModel.deleteOne({ _id: id });
    }

    async find(id: string): Promise<Item> {
        return this.itemModel.findOne({ _id: id }).exec();
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }
}
