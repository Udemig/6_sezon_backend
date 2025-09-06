import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret: Record<string, any>) => {
      delete ret?._id;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret: Record<string, any>) => {
      delete ret?._id;
    },
  },
  versionKey: false,
})
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'Blog', type: mongoose.Schema.Types.ObjectId })
  blog: string;

  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  user: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

export type CommentDocument = Comment & Document;

export { CommentSchema };
