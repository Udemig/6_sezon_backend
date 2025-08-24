import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      // token'ın nereden geldiğini belirtiyoruz (headers'dan)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // token'ın doğrulanması için gerekli olan secret key
      secretOrKey: configService.get('JWT_ACCESS_SECRET') || 'example-secret',
    });
  }

  // doğrulama işlemi tamamnaldıktan sonra çalışan fonksiyon
  // fonksiyondan return edilen değer request.user'a atanır
  async validate(payload: any) {
    // kullanıcının id'sine göre veritabanından bilgileri al
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });

    // kullanıcı bulunamazsa hata dön
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    // req.user'a kullanıcı verilerini atıyoruz
    return user;
  }
}
