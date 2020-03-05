import * as mongoose from 'mongoose';
import baseProperties from '../../common/schemas/base-schema-properties';
import { MongooseModule } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    access_token: String,
    recipeIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
    itemIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
}, { versionKey: false });
UserSchema.add(baseProperties);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (this.isModified('password')){
            this['password'] = await hash(this['password'], 10)
        }
    } catch (err) {
        return next(err);
    }
})

export { UserSchema };
