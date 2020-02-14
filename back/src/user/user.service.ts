import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({ _id: id }, { ...updateUserDto, updatedAt: new Date()});
    }

    async delete(id: string) {
        return this.userModel.deleteOne({ _id: id });
    }

    async find(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByUsername(username: string): Promise<User> {
        return this.userModel.findOne({
            username
        });
    }


}
