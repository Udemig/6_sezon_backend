import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      // token'ın nereden geldiğini belirtiyoruz (headers'dan)
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      // token'ın doğrulanması için gerekli olan secret key
      secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'example-secret',
    });
  }

  // doğrulama işlemi tamamnaldıktan sonra çalışan fonksiyon
  // fonksiyondan return edilen değer request.user'a atanır
  validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
