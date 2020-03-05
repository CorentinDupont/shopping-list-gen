import * as mongoose from 'mongoose';

export interface Item extends mongoose.Document {
    name: string;
    price: number;
}
