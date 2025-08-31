import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AccessGuard } from 'src/auth/guards/access-guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import type { Request as RequestType } from 'express';
import { UserType } from 'src/types';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(AccessGuard)
  @Post()
  create(@Request() req: RequestType, @Body() dto: CreateBlogDto) {
    return this.blogService.create(req.user as UserType, dto);
  }

  @Get()
  findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.blogService.findAll(page, limit);
  }

  @UseGuards(AccessGuard)
  @Get('own')
  findOwn(
    @Request() req: RequestType,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.blogService.findAll(page, limit, req.user);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.blogService.findById(id);
  }

  @UseGuards(AccessGuard)
  @Patch(':id')
  update(@Body() dto: UpdateBlogDto) {}

  @UseGuards(AccessGuard)
  @Delete(':id')
  delete() {}
}
