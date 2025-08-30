import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request as RequestType } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('access'))
  @Get('me')
  getProfile(@Request() req: RequestType) {
    const { password, ...rest } = req.user as Express.User;

    return { user: rest };
  }

  @UseGuards(AuthGuard('access'))
  @Patch('me')
  async updateProfile(@Request() req: RequestType, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user!._id, dto);

    const { password, ...rest } = user;

    return { user: rest };
  }
}
