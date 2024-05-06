// src/form/form.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Option, OptionSchema,OptionDocument } from './schemas/option.schema';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { User } from './schemas/user';


@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Option.name) private optionModel: Model<OptionDocument>,
    @InjectModel(User.name) private readonly userModel: Model<User>, 
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
  const newQuestion = new this.questionModel({ title, description, questionId, formId: form._id });
  
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

  async saveAnswer(formId: string, questionId: string, userId: string, stars: number): Promise<Question> {
    // ObjectId'ye dönüştürme ve geçerlilik kontrolü
    const validFormId = mongoose.Types.ObjectId.isValid(formId);
    const validQuestionId = mongoose.Types.ObjectId.isValid(questionId);
    const validUserId = mongoose.Types.ObjectId.isValid(userId);
  
    if (!validFormId || !validQuestionId || !validUserId) {
      throw new Error('Invalid IDs');
    }
  
    // Question belgesini bulma ve işlemlerin devamı
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }
  
    // Kullanıcının cevabını bulma veya yeni cevap ekleme
    let userAnswerIndex = -1;
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].userId.toString() === userId) {
        userAnswerIndex = i;
        break;
      }
    }
  
    if (userAnswerIndex !== -1) {
      // Kullanıcıya ait cevap zaten varsa güncelle
      question.answers[userAnswerIndex].stars = stars;
    } else {
      // Kullanıcıya ait cevap yoksa ekle
      question.answers.push({ userId: new mongoose.Types.ObjectId(userId), stars });
    }
  
    // Soruyu kaydet
    await question.save();
    
    // Kullanıcı belgesini bulma ve cevapları ekleyin
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Kullanıcıya ait cevapları ekle
    user.answers.push({ questionId: new mongoose.Types.ObjectId(questionId), userId: new mongoose.Types.ObjectId(userId), stars });
    await user.save();
    
    return question;
  }


  async createUserAndAddToForm(name: string, formId: string): Promise<User> {
    // Yeni kullanıcı oluşturma
    const lastUser = await this.userModel.findOne().sort({ userId: -1 }); // En son eklenen kullanıcıyı bul
    let newUserId = 1; // Yeni kullanıcının ID'si, varsayılan olarak 1
    if (lastUser) {
        newUserId = lastUser.userId + 1; // Son kullanıcının ID'sine 1 ekleyerek yeni ID oluştur
    }
    const newUser = new this.userModel({ name, userId: newUserId, answers: {} });
    await newUser.save();

    // Kullanıcıyı forma ekleme
    const form = await this.formModel.findById(formId);
    if (!form) {
        throw new Error('Form not found');
    }
    // Convert userId to string and add it to the form's users list
    form.users.push(newUser._id.toString()); // Yeni kullanıcının _id'sini string olarak ekliyoruz
    await form.save();

    return newUser;
}



async deleteQuestion(formId: string, questionId: string): Promise<Question> {
  const question = await this.questionModel.findByIdAndDelete(questionId).exec();
  if (!question) {
      throw new Error('Question not found');
  }
  return question;
}

async getUsers(formId: string): Promise<User[]> {
  const form = await this.formModel.findById(formId).exec();
  if (!form) {
    throw new Error('Form not found');
  }
  const users = await this.userModel.find({ _id: { $in: form.users } }).exec();
  return users;
}



  // Diğer işlemler buraya eklenebilir
}