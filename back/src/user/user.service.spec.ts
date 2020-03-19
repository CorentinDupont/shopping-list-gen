import {  Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UserSchema } from '../user/schemas/user.schema';
import * as request from 'supertest';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import '../../test/spec/factories/user';
import * as factoryGirl from 'factory-girl';

const factory = factoryGirl.factory;

describe('UserService', () => {
  describe('GET /', () => {

    let app: INestApplication;
    let httpService: HttpService;
    let userService: any;

    beforeAll(async () => {
      const userCreated = await factory.build('User').then(userGenerated => {
        return {
            id: userGenerated.id,
            username: userGenerated.username,
            password: userGenerated.password,
            access_token: userGenerated.access_token,
        };
      });

      userService = {
        findAll: () => userCreated,
      };
      const module: TestingModule = await Test.createTestingModule({
          imports: [AppModule, HttpModule],
        })
        .overrideProvider(UserService)
        .useValue(userService)
        .compile();

      app = module.createNestApplication();
      httpService = module.get < HttpService > (HttpService);
      await app.init();
    });

    it('should get users', async () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect({
          data: {
            type : 'users',
            id: userService.findAll().id,
            attributes : {
              username: userService.findAll().username,
              password: userService.findAll().password,
            },
          },
        })
        .expect(200);
    });

    afterAll(async () => {
      await app.close();
    });

  });

  describe('POST GOOD CREDENTIALS / ❔', () => {

    let app: INestApplication;
    let httpService: HttpService;
    let userService: any;
    let userToAuth: any;
    beforeAll(async () => {
       userToAuth = await factory.build('User').then(userGenerated => {
        return {
            id: userGenerated.id,
            username: userGenerated.username,
            password: userGenerated.password,
        };
      });

       userService = {
        findByUsername: (username: string) => userToAuth,
        create: (createUserDto: CreateUserDto) => userToAuth,
      };

       const module: TestingModule = await Test.createTestingModule({
          imports: [AppModule, HttpModule],
        })
        .overrideProvider(UserService)
        .useValue(userService)
        .compile();

       app = module.createNestApplication();
       httpService = module.get < HttpService > (HttpService);
       await app.init();
    });

    it('should create a user to authenticate' , async () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ data: {
            type: 'users',
            attributes: {
              username: userToAuth.username,
              password: 'password',
            },
          },
        })
        .expect(201);
    });

    it('post good token ✅', async () => {
      return request(app.getHttpServer())
        .post('/token')
        .send({username: userToAuth.username, password: 'password'})
        .expect(200);
    });

    afterAll(async () => {
      await app.close();
    });

  });

  describe('POST BAD CREDENTIALS/ ❌', () => {

    let app: INestApplication;
    let httpService: HttpService;
    let userService: any;
    let userToAuth: any;
    beforeAll(async () => {
       userToAuth = await factory.build('User').then(userGenerated => {
        return {
            id : userGenerated.id,
            username: userGenerated.username,
            password: userGenerated.password,
        };
      });

       userService = {
        findByUsername: (username: string) => userToAuth,
        create: (createUserDto: CreateUserDto) => userToAuth,
      };

       const module: TestingModule = await Test.createTestingModule({
          imports: [AppModule, HttpModule],
        })
        .overrideProvider(UserService)
        .useValue(userService)
        .compile();

       app = module.createNestApplication();
       httpService = module.get < HttpService > (HttpService);
       await app.init();
    });

    it('post bad token', async () => {
      return request(app.getHttpServer())
      .post('/token')
      .send({username: userToAuth.username, password: 'A wrong password'})
      .expect(400);
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
