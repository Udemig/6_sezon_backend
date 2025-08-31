import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
  // toJSON: { virtuals: true },
  // toObject: { virtuals: true },
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
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

export type BlogDocument = Blog & Document;
