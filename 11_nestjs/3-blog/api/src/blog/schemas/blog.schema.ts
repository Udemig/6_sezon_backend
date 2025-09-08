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
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  photo: string;

  @Prop()
  tags: string[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: string;

  commentCount?: number;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blog',
  count: true,
});

export type BlogDocument = Blog & Document;

export { BlogSchema };
