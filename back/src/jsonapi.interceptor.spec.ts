import { JsonapiInterceptor } from './jsonapi.interceptor';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { NestApplication } from '@nestjs/core';
import * as request from 'supertest';
import { MongoClient, Db } from 'mongodb';
import { Item } from './item/interfaces/item.interface';

describe('JsonapiInterceptor', () => {

  let app: NestApplication;
  let connection: MongoClient;
  let db: Db;
  let items: Item[];

  it('should be defined', () => {
    expect(new JsonapiInterceptor()).toBeDefined();
  });

  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb://localhost:27017/shopping-list-gen-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(`shopping-list-gen-test`);
  });

  beforeEach(async () => {

    // fake module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await db.collection('items').insertMany([
      {name: 'test1', price: 5},
      {name: 'test2', price: 18},
    ]);

    items = await db.collection('items').find({}).toArray();

    console.log('ITEMMMMSSS', items);
    await app.init();
    return;
  });

  afterEach(async () => {
    await db.collection('items').remove({});
    return;
  });

  it('should transform data with interceptor', async () => {
    return request(app.getHttpServer())
      .get('/items')
      .then((res) => {
        const body = res.body;
        const attemptedResponse = {
          data: [
            {
              type: 'items',
              id: items[0]._id.toString(),
              attributes: {
                price: items[0].price,
                name: items[0].name,
              },
            },
            {
              type: 'items',
              id: items[1]._id.toString(),
              attributes: {
                price: items[1].price,
                name: items[1].name,
              },
            },
          ],
        };
        expect(body).toEqual(attemptedResponse);
      });
  });

  it('should transform data with pipe', async () => {
    return request(app.getHttpServer())
      .post('/items')
      .send({
        data: {
          type: 'items',
          attributes: {
            name: 'string',
            price: 7,
          },
        },
      })
      .then((res) => {
        const body = res.body;
        expect(body.data.attributes).toEqual({name: 'string', price: 7});
        expect(body.data.type).toBe('items');
      });
  });
});
