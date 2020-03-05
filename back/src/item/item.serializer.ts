import {Serializer} from 'jsonapi-serializer';

const ItemSerializer = new Serializer('items', {
  attributes: ['name', 'price'],
});

export {ItemSerializer};
