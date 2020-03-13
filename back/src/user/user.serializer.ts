import {Serializer} from 'jsonapi-serializer';

const UserSerializer = new Serializer('users', {
  attributes: ['username', 'password'],
});

export {UserSerializer};
