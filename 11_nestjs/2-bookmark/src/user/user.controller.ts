import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/decorator/user.decorator';
import type { User as UserType } from '@prisma/client';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('profile')
  getProfile(@User() user: UserType) {
    return user;
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Patch('update')
  async updateUser(@User('id') id: number, @Body() body: EditUserDto) {
    return await this.userService.updateUser(id, body);
  }
}
