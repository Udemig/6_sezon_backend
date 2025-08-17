import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  // Nest.js'in dependency injection sistemiyle mongoose model'ine erişelim
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async create(body: User) {
    return await this.userModel.create(body);
  }
}
