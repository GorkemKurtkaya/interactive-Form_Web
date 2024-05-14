import { FormService } from './form.service';
import { Form } from './schemas/form.schema';
import { Question } from './schemas/question.schema';
import { FormDto } from './dto/form.dto';
import { Option } from './schemas/option.schema';
import { User } from './schemas/user';
export declare class FormController {
    private readonly formService;
    constructor(formService: FormService);
    createForm(formData: FormDto): Promise<Form>;
    addQuestionToForm(formId: string, questionData: Question): Promise<any>;
    getFormDetails(formId: string): Promise<Form>;
    getAllForms(): Promise<Form[]>;
    getQuestions(formId: string): Promise<Question[]>;
    getQuestionDetails(formId: string, questionId: string): Promise<Question>;
    getOptions(formId: string): Promise<Option[]>;
    saveAnswer(formId: string, questionId: string, body: any): Promise<Question>;
    deleteForm(formId: number): Promise<Form>;
    editForm(formId: number, formData: FormDto): Promise<Form>;
    deleteQuestion(formId: string, questionId: string): Promise<Question>;
    createUser(formId: string, body: {
        name: string;
    }): Promise<User>;
    getUsers(formId: string): Promise<User[]>;
    deleteUser(formId: string, userId: string): Promise<User>;
}
