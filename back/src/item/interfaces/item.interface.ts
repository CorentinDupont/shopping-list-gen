import * as mongoose from 'mongoose';

export interface Item extends mongoose.Document {
    _id?: string;
    name: string;
    price: number;
}
