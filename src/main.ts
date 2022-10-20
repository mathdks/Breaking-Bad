import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configs = app.get(ConfigService);
  const port = configs.get('develop.appPort');

  await app.listen(port);
}
bootstrap();
