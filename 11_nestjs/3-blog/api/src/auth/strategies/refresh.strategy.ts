import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      // tokenı cookie'den al
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.refresh_token,
      ]),
      // tokenı doğrulumak için kullanılacak anahtar
      secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'default',
    });
  }

  // tokenı doğruladıktan sonra çalışır
  async validate(payload: any) {
    // payload'ın içindeki kullanıcı id'sine sahip kullanıcı mevcut mu
    const user = await this.userService.findById(payload.userId);

    // kullanıyı bulunamadıysa hata dö
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    // kullanıcıyı döndür
    return user;
  }
}
