import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // http://localhost:3000/products/menu
  // adreslerine gelen get isteklerini yakalar
  @Get('menu')
  getMenu(): { message: string } {
    return { message: 'menü cevabı' };
  }

  // http://localhost:3000/products/categories
  // adreslerine gelen get isteklerini yakalar
  @Get('categories')
  getCategories(): { message: string } {
    return { message: 'kategoriler cevabı' };
  }
}

/* 
  arkplanda oluşan exğress kodu
  app.get("/products/menu", (req, res) => {
   res.send("menü cevabı");
  });

 app.get("/products/categories", (req, res) => {
  res.send("kategoriler cevabı");
 });
*/
