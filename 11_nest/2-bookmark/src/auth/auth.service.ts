import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignupDTO) {
    try {
      // şifreyi hashle
      const hashedPassword = await argon.hash(dto.password);

      // kullanıcıyı veritabanına kaydet
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash: hashedPassword,
        },
      });

      // token oluştur
      const accessToken = await this.signAccessToken(user.id, user.email);
      const refreshToken = await this.signRefreshToken(user.id, user.email);

      // kullanıcnın şifresi dışındaki değerleri dön
      const { hash, ...rest } = user;

      // client'a dönüş
      return {
        message: 'Kullanıcı hesabı oluşturuldu',
        user: rest,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Bu eposta adresi zaten kullanımda');
      }

      throw new BadRequestException(error.message);
    }
  }

  async login(dto: LoginDTO) {
    try {
      // kullanıcıyı veritabanından bul
      const user = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      // kullanıcı bulunamadıysa hata dön
      if (!user) {
        throw new ForbiddenException('Giriş bilgileri hatalı');
      }

      // şifre doğru mu kontrol et
      const isPasswordValid = await argon.verify(user.hash, dto.password);

      // şifre yanlışsa hata dön
      if (!isPasswordValid) {
        throw new ForbiddenException('Giriş bilgileri hatalı');
      }

      // tokenları oluştur
      const accessToken = await this.signAccessToken(user.id, user.email);
      const refreshToken = await this.signRefreshToken(user.id, user.email);

      // şifre dışındaki değerleri dön
      const { hash, ...rest } = user;

      return {
        message: 'Kullanıcı girişi başarılı',
        user: rest,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout() {
    return { message: 'Kullanıcı çıkışı başarılı' };
  }

  async refresh(id: number, email: string) {
    // kullanıcıyı veritabanından bul
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    // kullanıcı bulunamazsa hata dön
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    // yeni access token oluştur
    const accessToken = await this.signAccessToken(id, email);

    // client'a dönüş
    return { message: 'Token yenilendi', accessToken };
  }

  async signAccessToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });

    return accessToken;
  }

  async signRefreshToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return refreshToken;
  }
}
