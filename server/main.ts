import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import { NotFoundExceptionFilter } from './shared/not-found-exception.filter';

async function bootstrap() {

  const APP_PORT = process.env.PORT || 8080;
  const API_PREFIX = 'api';

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);

  // Global error handler to redirect all requests to index.html
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.enableCors();

  // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist/frontend')));

  await app.listen(APP_PORT);
  Logger.log(`API is running on 0.0.0.0:${APP_PORT}/${API_PREFIX}`);
}
bootstrap();
