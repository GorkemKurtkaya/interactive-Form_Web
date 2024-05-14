"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const form_schema_1 = require("./schemas/form.schema");
const question_schema_1 = require("./schemas/question.schema");
const option_schema_1 = require("./schemas/option.schema");
const mongoose_3 = require("mongoose");
const user_1 = require("./schemas/user");
const common_2 = require("@nestjs/common");
let FormService = class FormService {
    constructor(formModel, questionModel, optionModel, userModel) {
        this.formModel = formModel;
        this.questionModel = questionModel;
        this.optionModel = optionModel;
        this.userModel = userModel;
    }
    async createForm(name, description) {
        const lastForm = await this.formModel.findOne().sort({ formId: -1 });
        let newFormId = 1;
        if (lastForm) {
            newFormId = lastForm.formId + 1;
        }
        const newForm = new this.formModel({ name, description, formId: newFormId, questions: [] });
        return newForm.save();
    }
    async deleteForm(formId) {
        const form = await this.formModel.findOneAndDelete({ formId }).exec();
        if (!form) {
            throw new Error('Form not found');
        }
        return form;
    }
    async editForm(formId, name, description) {
        const form = await this.formModel.findByIdAndUpdate(formId, { name, description }, { new: true }).exec();
        if (!form) {
            throw new Error('Form not found');
        }
        return form;
    }
    async addQuestion(formId, title, description, questionType) {
        const form = await this.formModel.findById(formId);
        if (!form) {
            throw new common_2.NotFoundException('Form not found');
        }
        const questionId = form.questions.length + 1;
        const newQuestion = new this.questionModel({
            title,
            description,
            questionId,
            questionType,
            formId: form._id,
        });
        await newQuestion.save();
        form.questions.push(newQuestion._id);
        await form.save();
        return form;
    }
    async getAllForms() {
        return this.formModel.find().exec();
    }
    async getFormDetails(formId) {
        return this.formModel.findById(formId).populate('questions').exec();
    }
    async createRestrictedForm(adminId, name, description) {
        const isAdmin = await this.isAdminUser(adminId);
        if (!isAdmin) {
            throw new Error('Only admin users can create forms');
        }
        const newForm = new this.formModel({ name, description, questions: [] });
        return newForm.save();
    }
    async isAdminUser(adminId) {
        const adminIds = ['5ogDRLQtbtDC'];
        return adminIds.includes(adminId);
    }
    async getQuestions(formId) {
        const form = await this.formModel.findById(formId).exec();
        if (!form) {
            throw new Error('Form not found');
        }
        const questions = await this.questionModel.find({ _id: { $in: form.questions } }).exec();
        return questions;
    }
    async getOptions(formId) {
        const form = await this.formModel.findById(formId).populate('questions').exec();
        if (!form) {
            throw new Error('Form not found');
        }
        const questionIds = form.questions.map(question => question._id);
        return this.optionModel.find({ questionId: { $in: questionIds } }).exec();
    }
    async saveAnswer(formId, questionId, userId, stars) {
        const validFormId = mongoose_3.default.Types.ObjectId.isValid(formId);
        const validQuestionId = mongoose_3.default.Types.ObjectId.isValid(questionId);
        const validUserId = mongoose_3.default.Types.ObjectId.isValid(userId);
        if (!validFormId || !validQuestionId || !validUserId) {
            throw new Error('Invalid IDs');
        }
        const question = await this.questionModel.findById(questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        let userAnswerIndex = -1;
        for (let i = 0; i < question.answers.length; i++) {
            if (question.answers[i].userId.toString() === userId) {
                userAnswerIndex = i;
                break;
            }
        }
        if (userAnswerIndex !== -1) {
            question.answers[userAnswerIndex].stars = stars;
        }
        else {
            question.answers.push({ userId: new mongoose_3.default.Types.ObjectId(userId), stars });
        }
        await question.save();
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.answers.push({ questionId: new mongoose_3.default.Types.ObjectId(questionId), userId: new mongoose_3.default.Types.ObjectId(userId), stars });
        await user.save();
        return question;
    }
    async createUserAndAddToForm(name, formId) {
        const lastUser = await this.userModel.findOne().sort({ userId: -1 });
        let newUserId = 1;
        if (lastUser) {
            newUserId = lastUser.userId + 1;
        }
        const newUser = new this.userModel({ name, userId: newUserId, answers: {} });
        await newUser.save();
        const form = await this.formModel.findById(formId);
        if (!form) {
            throw new Error('Form not found');
        }
        form.users.push(newUser._id.toString());
        await form.save();
        return newUser;
    }
    async deleteQuestion(formId, questionId) {
        const question = await this.questionModel.findByIdAndDelete(questionId).exec();
        if (!question) {
            throw new Error('Question not found');
        }
        return question;
    }
    async getUsers(formId) {
        const form = await this.formModel.findById(formId).exec();
        if (!form) {
            throw new Error('Form not found');
        }
        const users = await this.userModel.find({ _id: { $in: form.users } }).exec();
        return users;
    }
    async getQuestionDetails(formId, questionId) {
        return this.questionModel.findById(questionId).exec();
    }
    async deleteUser(formId, userId) {
        const user = await this.userModel.findByIdAndDelete(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
};
exports.FormService = FormService;
exports.FormService = FormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(form_schema_1.Form.name)),
    __param(1, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(2, (0, mongoose_1.InjectModel)(option_schema_1.Option.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], FormService);
//# sourceMappingURL=form.service.js.map