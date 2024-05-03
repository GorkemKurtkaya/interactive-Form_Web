// src/form/form.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { Form, FormSchema } from './schemas/form.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { OptionSchema } from './schemas/option.schema';
import { UserSchema } from './schemas/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    MongooseModule.forFeature([{ name: 'Option', schema: OptionSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
