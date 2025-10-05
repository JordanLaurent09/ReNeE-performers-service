import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Renee Performers API')
    .setDescription('Документация по Renee Performers API')
    .setVersion('1.0')
    .addTag('API')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')))
  app.use(bodyParser.json({limit: '50mb'}))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
