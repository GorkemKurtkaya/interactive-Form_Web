import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Option, OptionSchema } from './option.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  title: string;

  @Prop()
  description: string;

  // @Prop({ type: [OptionSchema] })
  // options: Option[];

  @Prop({ type: Number,  default:0 ,min: 0, max: 5 }) // Rating değeri 0 ile 5 arasında olacak
  answers: Number;

  // İhtiyaç duyulan diğer alanlar buraya eklenebilir
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
