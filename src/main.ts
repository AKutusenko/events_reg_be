import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const API_PREFIX = 'api';
const VERSION = 'v1';
const TITLE = 'Events Hub API Documentation';
const ALL_ADDRESSES = '0.0.0.0';
const RESERVE_PORT = 80;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.servers = [{ url: `${API_PREFIX}/${VERSION}` }];
  SwaggerModule.setup(API_PREFIX, app, document);

  app.setGlobalPrefix(API_PREFIX);
  await app.listen(Number(process.env.APP_PORT) || RESERVE_PORT, ALL_ADDRESSES);
}
bootstrap();
