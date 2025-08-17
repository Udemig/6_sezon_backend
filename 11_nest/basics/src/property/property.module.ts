import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],

  // sadece property modülü içierisnde devreye girecek bir validation pipe tanımladık.
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true, // gelen veriyi DTO'daki veri tipine dönüştürür.
        },
      }),
    },
  ],
})
export class PropertyModule {}
