import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Form' })
  formId: mongoose.Types.ObjectId;

  @Prop({ type: [{ userId: mongoose.Types.ObjectId, stars: Number }] })
  answers: { userId: mongoose.Types.ObjectId; stars: number }[];

  @Prop({ type: Number, default: 1 })
  questionId: number;

  @Prop()
  questionType: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);