import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // projedeki türm modüller için ortak bir valiadasyon tanımladık.
  // global pipe'ın dezavantajı validation ayalarını kullandığımız yere göre yapamıyoruz
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
