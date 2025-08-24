import { Body, Controller, Get, Post, UsePipes, Headers } from '@nestjs/common';
import { ZodValidationPipe } from './pipe/zodValidationPipe';
import type { HeadersZodSchema, ProductZodSchema } from './dto/product.dto';
import { headersZodSchema, productZodSchema } from './dto/product.dto';
import { RequestHeader } from './pipe/headerDecorator';

@Controller('product')
export class ProductController {
  @Get()
  findAll(@RequestHeader() headers: HeadersZodSchema) {
    return { message: 'Ürünler listelendi', headers };
  }

  @Post()
  @UsePipes(new ZodValidationPipe(productZodSchema))
  create(@Body() body: ProductZodSchema) {
    return {
      message: 'Ürün oluşturuldu',
    };
  }
}
