import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  console.log(process.env.DB_MYSQL_USERNAME);
  console.log(process.env.DB_MYSQL_PASSWORD);
  console.log(process.env.DB_MYSQL_DATABASE);

  await app.listen(3000);
}
bootstrap();
