import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(id: number, body: EditUserDto) {
    // id'sine göre kullanıcının bilgilerini body'den gelen verilerle güncelle
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: body,
    });

    // şifre hariç verileri al
    const { hash, ...rest } = user;

    // güncellenen kullanıcının bilgilerini döndür
    return rest;
  }
}
