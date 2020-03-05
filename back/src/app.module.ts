import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JsonapiInterceptor } from './jsonapi.interceptor';
import { JsonapiPipe } from './jsonapi.pipe';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/shopping-list-gen-test', { useNewUrlParser: true, useUnifiedTopology: true }),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: JsonapiInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: JsonapiPipe,
    },
  ],
})
export class AppModule {}
