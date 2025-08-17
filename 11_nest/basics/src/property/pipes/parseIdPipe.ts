import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

// Custom Pipe: Gelen veriyi hem doğrulamak hemde formatını dönüştürmek için kullanılır.
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // string olan veriyi number'a çevir
    const val = parseInt(value);

    // sayı veritipinde gelmezse hata fırlat
    if (isNaN(val)) {
      throw new BadRequestException('Geçersiz ID');
    }

    // sayı 1'den küçükse hata fırlat
    if (val < 1) {
      throw new BadRequestException("Id 1'den küçük olamaz");
    }

    // çıkış değeri return ediyoryz
    return val;
  }
}
