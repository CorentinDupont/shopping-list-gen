import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JsonapiPipe } from './jsonapi.pipe';
import bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Shopping List')
    .setDescription('The shopping list generator swagger API')
    .setVersion('1.0')
    .addTag('Shopping List')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  await app.listen(3009);
}
bootstrap();
