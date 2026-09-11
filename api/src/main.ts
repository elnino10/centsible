import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get<number>('PORT') ?? 3000);
}
await bootstrap();
