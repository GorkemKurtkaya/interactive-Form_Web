import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ type: [{ questionId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, stars: Number, answer: String }] })
  answers: { questionId: mongoose.Types.ObjectId; userId: mongoose.Types.ObjectId; stars: number; answer: string }[];

  @Prop({ type: Number, default: 1 }) // ID olarak kullanılacak alan, başlangıç değeri olarak 1 verildi
  userId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
