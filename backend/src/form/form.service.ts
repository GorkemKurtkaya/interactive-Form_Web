// src/form/form.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Option, OptionSchema,OptionDocument } from './schemas/option.schema';
import mongoose from 'mongoose';


@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Option.name) private optionModel: Model<OptionDocument>,
  ) {}
  

  async createForm(name: string, description: string): Promise<Form> {
    const lastForm = await this.formModel.findOne().sort({ formId: -1 }); // En son eklenen formu bul
    let newFormId = 1; // Yeni formun ID'si, varsayılan olarak 1
    if (lastForm) {
        newFormId = lastForm.formId + 1; // Son formun ID'sine 1 ekleyerek yeni ID oluştur
    }
    const newForm = new this.formModel({ name, description, formId: newFormId, questions: [] });
    return newForm.save();
}

async deleteForm(formId: number): Promise<Form> {
    const form = await this.formModel.findOneAndDelete({ formId }).exec();
    if (!form) {
        throw new Error('Form not found');
    }
    return form;
}

async editForm(formId: number, name: string, description: string): Promise<Form> {
  const form = await this.formModel.findByIdAndUpdate(formId, { name, description }, { new: true }).exec();
  if (!form) {
      throw new Error('Form not found');
  }
  return form;
}

async addQuestion(formId: string, title: string, description: string): Promise<Form> {
  const form = await this.formModel.findById(formId);
  if (!form) {
      throw new Error('Form not found');
  }

  // Yeni soru için questionId değerini hesapla ve arttır
  const questionId = form.questions.length + 1;

  // const newOptions = options.map(option => ({ value: option }));
  const newQuestion = new this.questionModel({ title, description, questionId });
  
  await newQuestion.save();
  form.questions.push(newQuestion._id);
  await form.save();
  return form;
}


async getAllForms(): Promise<Form[]> {
    return this.formModel.find().exec();
  }


  async getFormDetails(formId: string): Promise<Form> {
    return this.formModel.findById(formId).populate('questions').exec();
  }

  async createRestrictedForm(adminId: string, name: string, description: string): Promise<Form> {
    const isAdmin = await this.isAdminUser(adminId); // Kullanıcıyı admin olarak kontrol edin
    if (!isAdmin) {
      throw new Error('Only admin users can create forms');
    }

    const newForm = new this.formModel({ name, description, questions: [] });
    return newForm.save();
  }

  private async isAdminUser(adminId: string): Promise<boolean> {
    // Burada admin kullanıcının varlığını kontrol etmek için gerekli kodlar yer almalıdır
    // Örnek olarak, belirli bir admin ID'sine sahip kullanıcıyı admin olarak kabul edelim
    const adminIds = ['5ogDRLQtbtDC']; // Örnek admin ID listesi, gerçek projede kullanıcıdan alınmalıdır
    return adminIds.includes(adminId);
  }

  async getQuestions(formId: string): Promise<Question[]> {
    const form = await this.formModel.findById(formId).exec();
    if (!form) {
      throw new Error('Form not found');
    }
    const questions = await this.questionModel.find({ _id: { $in: form.questions } }).exec();
    return questions;
  }

  async getOptions(formId: string): Promise<Option[]> {
    const form = await this.formModel.findById(formId).populate('questions').exec();
    if (!form) {
      throw new Error('Form not found');
    }
    const questionIds = form.questions.map(question => question._id);
    return this.optionModel.find({ questionId: { $in: questionIds } }).exec();
  }

  async saveAnswer(questionId: string, stars: number): Promise<Question> {
    // ObjectId'ye dönüştürme
    const validObjectId = mongoose.Types.ObjectId.isValid(questionId);
    if (!validObjectId) {
        throw new Error('Invalid questionId');
    }
    const objectId = new mongoose.Types.ObjectId(questionId);

    // Question belgesini bulma ve işlemlerin devamı
    const question = await this.questionModel.findById(objectId);
    if (!question) {
        throw new Error('Question not found');
    }

    question.answers = stars;
    await question.save();
    return question;
}

async deleteQuestion(formId: string, questionId: string): Promise<Question> {
  const question = await this.questionModel.findByIdAndDelete(questionId).exec();
  if (!question) {
      throw new Error('Question not found');
  }
  return question;
}



  // Diğer işlemler buraya eklenebilir
}