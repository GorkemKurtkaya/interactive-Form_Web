import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ type: Map, of: String }) // Soru ID'si ve cevapları içeren
  answers: Map<string, string>;

    @Prop({ type: Number, default: 1 }) // ID olarak kullanılacak alan, başlangıç değeri olarak 1 verildi
    userId: number;
  
  

  // İhtiyaç duyulan diğer alanlar buraya eklenebilir
}

export const UserSchema = SchemaFactory.createForClass(User);