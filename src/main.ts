import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: true
  });
  app.enableCors();
  app.useBodyParser('json');
  app.enableCors();
  // app.use(cookieParser())
  await app.listen(5000);
}
bootstrap();
