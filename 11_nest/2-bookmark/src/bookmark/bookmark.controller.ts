import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/decorator/user.decorator';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get()
  async getBookmarks(@User('id') id: number) {
    return await this.bookmarkService.getBookmarks(id);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get(':id')
  async getBookmarkById(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return await this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt-access'))
  @Post()
  async createBookmark(@User('id') id: number, @Body() dto: CreateBookmarkDto) {
    return await this.bookmarkService.createBookmark(id, dto);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Patch(':id')
  async updateBookmark(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: UpdateBookmarkDto,
  ) {
    return await this.bookmarkService.updateBookmark(userId, bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt-access'))
  @Delete(':id')
  async deleteBookmark(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return await this.bookmarkService.deleteBookmark(userId, bookmarkId);
  }
}
