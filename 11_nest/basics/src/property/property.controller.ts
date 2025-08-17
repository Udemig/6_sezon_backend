import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDTO } from './dto/createProperty.dto';
import { IdParamDTO } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import type { CreatePropertyZodSchema } from './dto/createPropertyZod.dto';

@Controller('property')
export class PropertyController {
  // Bir endpoint tanımladık
  // localhost:3000/property adresine gelen GET isteklerini yakalıyacak
  // istek gelince findAll fonksiyonunu çalıştırıyoruz.
  // findAll fonksiyonun return ettiği değer client'a cevap olarak gönderilecek.
  @Get()
  findAll(@Query('sort', ParseBoolPipe) sort) {
    return { message: 'Bütün mülk listesi', sort };
  }

  // localhost:3000/property/1 adresine gelen GET isteklerini yakalıyacak
  // id parametresini tanımladık
  // @Param decorator'u ile id parametresine erişebiliyoruz
  // birden fazla parametre olduğunda parametreler bir nesne olarak gelir.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return { message: `mülke erişildi`, id };
  }

  // @Body() decorator'u ile gelen verileri alabiliriz.
  // @HttpCode() decorator'u ile HTTP status code'u belirleyebiliriz.
  // @UsePipes() decorator'u ile gelen verileri doğrulama yapabiliriz.
  // Body verisinin doğrulanması için tipini DTO olarak belirledik.
  // whitelist: true, DTO'da tanımlanmamış verileri kaldırır.
  // forbidNonWhitelisted: true, DTO'da tanımlanmamış veriler gelirse hata verir.
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() body: CreatePropertyDTO) {
    return { message: 'Mülk oluşturuldu', body };
  }

  // groups: ['update'], sadece update gruba özgü validasyonları yapılır.
  // always: true, update grubunda olmayan validasyonları da çalıştırılır.
  @Patch(':id')
  @UsePipes(new ValidationPipe({ groups: ['update'], always: true }))
  update(@Param('id') id, @Body() body: CreatePropertyDTO) {
    return { id, body, message: 'Mülk güncellendi' };
  }

  @Put(':id')
  updatePart(@Param() { id }: IdParamDTO) {
    return { id, message: 'Mülk kısmi güncellendi' };
  }

  @Delete(':id')
  delete(@Param('id', ParseIdPipe) id: number) {
    return { id, message: 'Mülk silindi' };
  }
}
