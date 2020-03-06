import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { inspect, debug } from 'util';
import { UserSchema } from './schemas/user.schema';
const request = require('supertest');

const app = require('../main');
const db = {
  User: require('./schemas/user.schema')
}

const cleanDb = require('../../test/spec/helpers/cleanDb')
require('../../test/spec/factories/user').factory
const factory = require('factory-girl').factory

describe('GET /', () => {
  let response;

  beforeEach(async () => {

      const module: TestingModule = await Test.createTestingModule({
        controllers: [UserService],
      }).compile();
  
      const controller = module.get<UserService>(UserService);
      await cleanDb(db)
      response = await request(app).get('/');
  })

  test('It should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
  });
});


