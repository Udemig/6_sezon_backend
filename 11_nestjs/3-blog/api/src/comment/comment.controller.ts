import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AccessGuard } from 'src/auth/guards/access-guard';
import type { Request as RequestType } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserType } from 'src/types';

@Controller()
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/blog/:blogId/comments')
  findAllByBlog(@Param('blogId') blogId: string) {
    return this.commentService.findAllByBlog(blogId);
  }

  @UseGuards(AccessGuard)
  @Post('/blog/:blogId/comments')
  create(
    @Request() request: RequestType,
    @Param('blogId') blogId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.create(request.user as UserType, blogId, dto);
  }

  @UseGuards(AccessGuard)
  @Delete('/blog/:blogId/comments/:commentId')
  delete(
    @Request() request: RequestType,
    @Param('blogId') blogId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.delete(
      request.user as UserType,
      blogId,
      commentId,
    );
  }
}
