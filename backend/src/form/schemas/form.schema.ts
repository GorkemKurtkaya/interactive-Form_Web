import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose'; // mongoose modülünden Types'ı import etmek

export type FormDocument = Form & Document;

@Schema()
export class Form {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Question' }] }) // Types.ObjectId kullanıldı
  questions: mongoose.Types.ObjectId[]; // ObjectId'lerin içeren bir dizi

  @Prop({ type: Number, default: 1 }) // ID olarak kullanılacak alan, başlangıç değeri olarak 1 verildi
  formId: number;

  @Prop({ type: [String], default: [] }) // Formu tamamlayan kullanıcıların ID'lerini içerecek dizi
  users: string[];

  // İhtiyaç duyulan diğer alanlar buraya eklenebilir
} 

export const FormSchema = SchemaFactory.createForClass(Form);