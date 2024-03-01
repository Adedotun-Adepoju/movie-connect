import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT
  app.setBaseViewsDir(join(__dirname, 'modules', 'mail', 'views',));
  app.set('view options', { layout: 'layouts/main' });
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
