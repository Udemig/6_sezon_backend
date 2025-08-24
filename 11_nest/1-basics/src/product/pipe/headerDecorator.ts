import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { headersZodSchema } from '../dto/product.dto';

// Custom Decorator
export const RequestHeader = createParamDecorator(
  // createParamDecorator, NestJS'de özel bir parametre decorator'u oluşturur
  // parametre olarak bir fonksiyon olur
  async (data: unknown, ctx: ExecutionContext) => {
    // data: decorator'a gönderilen veri
    // ctx: isteğin detalaylarına erişmemizi sağlayan nesne

    // 1. HTTP isteğiyle gelen headerl'a erişicez
    const headers = ctx.switchToHttp().getRequest().headers;

    // 2. Başlıkların hedef DTO'ya uygunluğunu kontrol edeceğiz
    return headersZodSchema.parse(headers);
  },
);
