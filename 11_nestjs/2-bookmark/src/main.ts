import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global validation pipe - tüm DTO validasyonları için
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO'da tanımlanmayan alanları otomatik filtreler
      transform: true, // gelen veriyi DTO tipine dönüştür   "123" -> 123
      forbidNonWhitelisted: true, // DTO'da tanımlanmayan alanları hata verir
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
