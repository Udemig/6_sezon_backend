import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Kullanıcı zaten mevcut');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByUsername(dto.username);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Giriş bilgileri hatalı');
    }

    const accessToken = this.generateAccessToken(
      user.id as string,
      user.username,
    );
    const refreshToken = this.generateRefreshToken(
      user.id as string,
      user.username,
    );

    const { password, ...rest } = user;

    return { user: rest, accessToken, refreshToken };
  }

  generateAccessToken(userId: string, userName: string) {
    const payload = { userName, userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    });
  }

  generateRefreshToken(userId: string, userName: string) {
    const payload = { userName, userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }
}
