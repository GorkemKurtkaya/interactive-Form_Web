// src/form/schemas/option.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop()
  value: string;

  // İhtiyaç duyulan diğer alanlar buraya eklenebilir
}

export const OptionSchema = SchemaFactory.createForClass(Option);