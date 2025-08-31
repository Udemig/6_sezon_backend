import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Response as ResponseType, Request as RequestType } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    const { password, ...rest } = user;

    return rest;
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Response({ passthrough: true }) res: ResponseType,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.login(dto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('refresh'))
  @Post('refresh-token')
  refresh(
    @Request() req: RequestType,
    @Response({ passthrough: true }) res: ResponseType,
  ) {
    const accessToken = this.authService.generateAccessToken(
      req.user?._id as string,
      req.user?.username as string,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { message: 'Yeni access token oluşturuldu' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('access'))
  @Post('logout')
  async logout(@Response({ passthrough: true }) res: ResponseType) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Çıkış yapıldı' };
  }
}
