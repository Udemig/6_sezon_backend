import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UserType } from 'src/types';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(user: UserType, dto: CreateBlogDto) {
    const newBlog = await this.blogModel.create({ ...dto, author: user._id });

    return newBlog;
  }

  async findAll(page: number, limit: number, user?: UserType) {
    const [blogs, total] = await Promise.all([
      this.blogModel
        .find(user ? { author: user._id } : {})
        .populate('author', '-password -__v')
        .skip((page - 1) * limit)
        .limit(limit),

      this.blogModel.countDocuments(user ? { author: user._id } : {}),
    ]);

    return { total, pages: Math.ceil(total / limit), blogs };
  }

  async findById(id: string) {
    const blog = await this.blogModel.findById(id);

    if (!blog) {
      throw new NotFoundException();
    }

    return blog;
  }
}
