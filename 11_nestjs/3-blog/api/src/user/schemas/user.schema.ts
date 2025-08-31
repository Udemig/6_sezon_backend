import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

// class üzerinden bir schema oluşturduk.
const UserSchema = SchemaFactory.createForClass(User);

// kullanıcı belgesinin tipini tanımla
export type UserDocument = User & Document;

// kullanıcıyı kaydetmeden önce şifre değiştiyse şifresini hashle
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

// schema'yı dışarıya aç
export { UserSchema };
