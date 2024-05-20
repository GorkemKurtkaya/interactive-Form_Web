/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import mongoose from 'mongoose';
export type QuestionDocument = Question & Document;
export declare class Question {
    title: string;
    description: string;
    formId: mongoose.Types.ObjectId;
    answers: {
        userId: mongoose.Types.ObjectId;
        stars: number;
        answer: string;
    }[];
    questionId: number;
    questionType: string;
}
export declare const QuestionSchema: mongoose.Schema<Question, mongoose.Model<Question, any, any, any, Document<unknown, any, Question> & Question & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Question, Document<unknown, {}, mongoose.FlatRecord<Question>> & mongoose.FlatRecord<Question> & {
    _id: mongoose.Types.ObjectId;
}>;
