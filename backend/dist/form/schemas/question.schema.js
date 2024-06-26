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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = exports.Question = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Question = class Question {
};
exports.Question = Question;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Question.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: 'Form' }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Question.prototype, "formId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ userId: mongoose_2.default.Types.ObjectId, stars: Number, answer: String }] }),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], Question.prototype, "questionId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Question.prototype, "questionType", void 0);
exports.Question = Question = __decorate([
    (0, mongoose_1.Schema)()
], Question);
exports.QuestionSchema = mongoose_1.SchemaFactory.createForClass(Question);
//# sourceMappingURL=question.schema.js.map