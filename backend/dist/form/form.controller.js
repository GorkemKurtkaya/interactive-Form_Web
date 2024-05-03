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
exports.FormController = void 0;
const common_1 = require("@nestjs/common");
const form_service_1 = require("./form.service");
const question_schema_1 = require("./schemas/question.schema");
const form_dto_1 = require("./dto/form.dto");
let FormController = class FormController {
    constructor(formService) {
        this.formService = formService;
    }
    async createForm(formData) {
        return this.formService.createForm(formData.name, formData.description);
    }
    async addQuestionToForm(formId, questionData) {
        const { title, description } = questionData;
        const form = await this.formService.addQuestion(formId, title, description);
        return { message: 'Soru başarıyla eklendi', form };
    }
    async getFormDetails(formId) {
        return this.formService.getFormDetails(formId);
    }
    async getAllForms() {
        return this.formService.getAllForms();
    }
    async getQuestions(formId) {
        return this.formService.getQuestions(formId);
    }
    async getOptions(formId) {
        return this.formService.getOptions(formId);
    }
    async saveAnswer(formId, questionId, body) {
        const { stars, userId } = body;
        return this.formService.saveAnswer(formId, questionId, userId, stars);
    }
    async deleteForm(formId) {
        return this.formService.deleteForm(formId);
    }
    async editForm(formId, formData) {
        return this.formService.editForm(formId, formData.name, formData.description);
    }
    async deleteQuestion(formId, questionId) {
        return this.formService.deleteQuestion(formId, questionId);
    }
    async createUser(formId, body) {
        const { name } = body;
        const user = await this.formService.createUserAndAddToForm(name, formId);
        return user;
    }
};
exports.FormController = FormController;
__decorate([
    (0, common_1.Post)("/createform"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_dto_1.FormDto]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "createForm", null);
__decorate([
    (0, common_1.Post)(':formId/questions'),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, question_schema_1.Question]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "addQuestionToForm", null);
__decorate([
    (0, common_1.Get)(':formId'),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getFormDetails", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getAllForms", null);
__decorate([
    (0, common_1.Get)(':formId/questions'),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Get)(':formId/options'),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getOptions", null);
__decorate([
    (0, common_1.Post)(':formId/questions/:questionId/answers'),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Param)('questionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "saveAnswer", null);
__decorate([
    (0, common_1.Post)(":formId/delete"),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "deleteForm", null);
__decorate([
    (0, common_1.Post)(":formId/edit"),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, form_dto_1.FormDto]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "editForm", null);
__decorate([
    (0, common_1.Post)(':formId/questions/:questionId/delete'),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)("createUser/:formId"),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "createUser", null);
exports.FormController = FormController = __decorate([
    (0, common_1.Controller)('forms'),
    __metadata("design:paramtypes", [form_service_1.FormService])
], FormController);
//# sourceMappingURL=form.controller.js.map