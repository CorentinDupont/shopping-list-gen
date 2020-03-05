import * as mongoose from 'mongoose';
import baseProperties from '../../common/schemas/base-schema-properties';

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
}, { versionKey: false });
ItemSchema.add(baseProperties);

export { ItemSchema };
