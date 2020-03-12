import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { MongoClient, Db } from 'mongodb';
import { Item } from './interfaces/item.interface';
import { AppModule } from '../app.module';

describe('ItemService', () => {
  let service: ItemService;
  let connection: MongoClient
  let db: Db;

  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb://localhost:27017/shopping-list-gen-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(`shopping-list-gen-test`);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  afterEach(async () => {
    db.collection('items').remove({});
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send error trying to create already existing item in mongodb', async () => {
    try {
      await db.collection('items').insert({name: 'item', price: 5});
      await db.collection('items').insert({name: 'item', price: 78});
    } catch (e) {}

    const sameItems = await db.collection('items').find({name: 'item'}).toArray();
    expect(sameItems.length).toBe(1);
  });
});
