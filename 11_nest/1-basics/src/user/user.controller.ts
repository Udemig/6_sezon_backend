import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  // Dependency Injection
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();

      return { message: 'Kullanıcılar listelendi', users };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);

      return { message: 'Kullanıcı bulundu', user };
    } catch (error) {
      throw new NotFoundException("Bu ID'li kullanıcı bulunamadı");
    }
  }

  @Post()
  async create(@Body() body: any) {
    const user = await this.userService.create(body);

    return { message: 'Kullanıcı oluşturuldu', user };
  }
}
