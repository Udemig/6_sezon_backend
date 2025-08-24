import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId },
    });

    if (!bookmarks || bookmarks.length === 0) {
      throw new NotFoundException('Bookmark bulunamadı');
    }

    return bookmarks;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: { userId, id: bookmarkId },
      });

      return bookmark;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Bookmark bulunamadı');
      }

      throw error;
    }
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        link: dto.link || '',
      },
    });

    return bookmark;
  }

  async updateBookmark(
    userId: number,
    bookmarkId: number,
    dto: UpdateBookmarkDto,
  ) {
    try {
      const bookmark = await this.prisma.bookmark.update({
        where: { userId, id: bookmarkId },
        data: {
          title: dto.title,
          description: dto.description,
          link: dto.link,
        },
      });

      return bookmark;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Bookmark bulunamadı');
      }

      throw error;
    }
  }

  async deleteBookmark(userId: number, bookmarkId: number) {
    try {
      await this.prisma.bookmark.delete({
        where: { userId, id: bookmarkId },
      });

      return { message: 'Bookmark başarıyla silindi' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Bookmark bulunamadı');
      }

      throw error;
    }
  }
}
