"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const form_controller_1 = require("./form.controller");
const form_service_1 = require("./form.service");
const form_schema_1 = require("./schemas/form.schema");
const question_schema_1 = require("./schemas/question.schema");
const option_schema_1 = require("./schemas/option.schema");
const user_1 = require("./schemas/user");
let FormModule = class FormModule {
};
exports.FormModule = FormModule;
exports.FormModule = FormModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: form_schema_1.Form.name, schema: form_schema_1.FormSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Option', schema: option_schema_1.OptionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_1.UserSchema }]),
        ],
        controllers: [form_controller_1.FormController],
        providers: [form_service_1.FormService],
    })
], FormModule);
//# sourceMappingURL=form.module.js.map