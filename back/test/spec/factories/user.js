const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.MongooseAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../../src/user/schemas/user.schema');

factory.define('user', User, {
  username: factory.sequence((n) => `username${n}`),
  password: factory.sequence((n) => `password${n}`),
})
