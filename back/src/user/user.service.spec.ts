import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { inspect, debug } from 'util';
import { UserSchema } from './schemas/user.schema';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UserModule } from './user.module';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
const request = require('supertest');

const app = require('../main');
const db = {
  User: require('./schemas/user.schema')
}

//const cleanDb = require('../../test/spec/helpers/cleanDb')
require('../../test/spec/factories/user').factory
const factory = require('factory-girl').factory

jest.useFakeTimers();



describe('GET /', () => {

  let app: INestApplication
  let httpService : HttpService
  let usersService = { findAll: () => [{username:'rémi', password:'cureau'} ]};

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule, UserModule],
      providers : [UserService]
    })
      .overrideProvider(UserService)
      .useValue(usersService)
      .compile();
    
    app = module.createNestApplication();
    httpService = module.get<HttpService>(HttpService);
    await app.init();
    })

    it('should get users', async () => {
      return request(app.getHttpServer()).get('/users').expect(200).expect(
        usersService.findAll()
      )
  });

  afterAll(async () => {
    await app.close();
  })

})

describe('POST GOOD CREDENTIALS /', () => {

  let app: INestApplication
  let httpService : HttpService
  let createUser : CreateUserDto = {username:'rémi', password:'cureau'}

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    })
      .compile();
    
    app = module.createNestApplication();
    httpService = module.get<HttpService>(HttpService);
    await app.init();
    })

    it('post good token', async () => {
      return request(app.getHttpServer()).post('/token').expect(200).send(
        createUser
      )
  });

  afterAll(async () => {
    await app.close();
  })

})

describe('POST BAD CREDENTIALS/', () => {

  let app: INestApplication
  let httpService : HttpService
  let createUser : CreateUserDto = {username:'quentin', password:'dijoux'}

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    })
      .compile();
    
    app = module.createNestApplication();
    httpService = module.get<HttpService>(HttpService);
    await app.init();
    })

    it('post bad token', async () => {
      return request(app.getHttpServer()).post('/token').expect(400).send(
        createUser
      )
  });

  afterAll(async () => {
    await app.close();
  })

})

