import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')))
  app.use(bodyParser.json({limit: '50mb'}))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
