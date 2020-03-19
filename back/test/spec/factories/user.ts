import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { UserSchema } from '../../../src/user/schemas/user.schema';
import * as factoryGirl from 'factory-girl';

const adapter = new factoryGirl.MongooseAdapter();
const factory = factoryGirl.factory;
factory.setAdapter(adapter);

const UserModel = mongoose.model('User', UserSchema);

factory.define('User', UserModel, {
  id: factory.sequence('id', (n) => n),
  username: factory.chance('name'),
  password: bcrypt.hashSync('password', 10),
  access_token: factory.chance('name'),
});
