// src/form/form.controller.ts

import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { Form } from './schemas/form.schema';
import { Question } from './schemas/question.schema';
import { FormDto } from './dto/form.dto';
import { Option } from './schemas/option.schema';
import { User } from './schemas/user';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post("/createform")
  async createForm(@Body() formData: FormDto): Promise<Form> {
    return this.formService.createForm(formData.name, formData.description);
  }

  @Post(':formId/questions')
  async addQuestionToForm(
    @Param('formId') formId: string,
    @Body() questionData: Question,
    ): Promise<any> {
      const { title, description } = questionData;
      const form = await this.formService.addQuestion(formId, title, description, questionData.questionType);
      return { message: 'Soru başarıyla eklendi', form };
  }




  @Get(':formId')
  async getFormDetails(@Param('formId') formId: string): Promise<Form> {
    return this.formService.getFormDetails(formId);
  }

  @Get()
  async getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @Get(':formId/questions')
  async getQuestions(@Param('formId') formId: string): Promise<Question[]> {
    return this.formService.getQuestions(formId);
  }

  @Get(':formId/questions/:questionId')
  async getQuestionDetails(
    @Param('formId') formId: string,
    @Param('questionId') questionId: string,
  ): Promise<Question> {
    return this.formService.getQuestionDetails(formId, questionId);
  }

  @Get(':formId/options')
  async getOptions(@Param('formId') formId: string): Promise<Option[]> {
    return this.formService.getOptions(formId);
  }

  @Post(':formId/questions/:questionId/answers')
  async saveAnswer(
    @Param('formId') formId: string,
    @Param('questionId') questionId: string,
    @Body() body: any,
  ) {
    const { stars, userId,answer } = body; // Gövdeden userId ve stars değerlerini al
    return this.formService.saveAnswer(formId, questionId, userId, stars,answer); // saveAnswer yöntemini çağır
  }

  @Post(":formId/delete")
  async deleteForm(@Param('formId') formId: number): Promise<Form> {
    return this.formService.deleteForm(formId);
  }

  @Post(":formId/edit")
  async editForm(@Param('formId') formId: number, @Body() formData: FormDto): Promise<Form> {
    return this.formService.editForm(formId, formData.name, formData.description);
  }

  @Post(':formId/questions/:questionId/delete')
  async deleteQuestion(@Param('formId') formId: string, @Param('questionId') questionId: string): Promise<Question> {
    return this.formService.deleteQuestion(formId, questionId);
  }

  @Post("createUser/:formId")
async createUser(
  @Param('formId') formId: string,
  @Body() body: { name: string }
): Promise<User> {
  const { name } = body;
  const user = await this.formService.createUserAndAddToForm(name, formId); // Kullanıcı oluşturulup forma eklendi
  return user;
}

@Get(':formId/users')
async getUsers(@Param('formId') formId: string): Promise<User[]> {
  return this.formService.getUsers(formId);

}

@Delete(':formId/users/:userId')
async deleteUser(@Param('formId') formId: string, @Param('userId') userId: string): Promise<User> {
  return this.formService.deleteUser(formId, userId);

}

}





