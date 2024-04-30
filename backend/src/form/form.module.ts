// src/form/form.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { Form, FormSchema } from './schemas/form.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { OptionSchema } from './schemas/option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    MongooseModule.forFeature([{ name: 'Option', schema: OptionSchema }]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
