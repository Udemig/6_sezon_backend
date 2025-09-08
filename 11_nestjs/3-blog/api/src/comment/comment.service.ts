import { Injectable, NotFoundException } from '@nestjs/common';
import { UserType } from 'src/types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private blogService: BlogService,
  ) {}

  async create(user: UserType, blogId: string, dto: CreateCommentDto) {
    console.log(user, blogId, dto);
    // göderi id'si geçerli mi kontrol et
    const blog = await this.blogService.findById(blogId);

    // gönderi bulamadıysa hata fırlat
    if (!blog) {
      throw new NotFoundException('Bu gönderi bulunamadı');
    }

    // yorumu oluştur
    return await this.commentModel.create({
      ...dto,
      blog: blog.id,
      user: user.id,
    });
  }

  async findAllByBlog(blogId: string) {
    return await this.commentModel
      .find({ blog: blogId })
      .populate('user', '-password -__v')
      .sort({ createdAt: -1 });
  }

  async delete(user: UserType, blogId: string, commentId: string) {
    // yorumu bul
    const comment = await this.commentModel.findOne({
      _id: commentId,
      blog: blogId,
      user: user.id,
    });

    // yorum bulamadıysa hata fırlat
    if (!comment) {
      throw new NotFoundException('Bu yorum bulunamadı');
    }

    // yorumu sil
    return await this.commentModel.findByIdAndDelete(commentId);
  }
}
