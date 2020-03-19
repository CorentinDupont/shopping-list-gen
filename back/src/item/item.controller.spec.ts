import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemService } from './item.service';
import { NestApplication, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import * as request from 'supertest';
import { MongoClient, Db } from 'mongodb';
import { ItemSchema } from './schemas/item.schema';
import { AppModule } from '../app.module';
import { JsonapiInterceptor } from '../jsonapi.interceptor';
import { JsonapiPipe } from '../jsonapi.pipe';

describe('Item Controller', () => {
  let controller: ItemController;
  let app: NestApplication;

  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb://localhost:27017/shopping-list-gen-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(`shopping-list-gen-test`);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/shopping-list-gen-test', { useNewUrlParser: true, useUnifiedTopology: true }),
        MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
      ],
      controllers: [ItemController],
      providers: [
        ItemService,
        {
          provide: APP_INTERCEPTOR,
          useClass: JsonapiInterceptor,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    controller = app.get<ItemController>(ItemController);
    await app.init();
  });

  afterEach(async () => {
    await db.collection('items').remove({});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an item', async () => {
    return request(app.getHttpServer())
      .post('/items')
      .send({data: {type: 'items', attributes: {name: 'item', price: 78}}})
      .expect(201);
  });

  it('should send 400 trying to insert duplicated item', async () => {
    await db.collection('items').insertOne({name: 'item', price: 5});
    return request(app.getHttpServer())
      .post('/items')
      .send({data: {type: 'items', attributes: {name: 'item', price: 78}}})
      .expect(400);
  });
});
