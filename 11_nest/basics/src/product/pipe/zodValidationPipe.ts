import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import type { ZodSchema } from 'zod';

// zod için custon validasyon pipe
// value olarak gelen datayı alır
// doğrulanacak shemayı alır
// gelen value'Nun şemaya uygunluğunu kontrol eder
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const parsed = this.schema.safeParse(value);

    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }

    return parsed.data;
  }
}
