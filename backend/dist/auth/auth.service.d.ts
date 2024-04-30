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
import { Admin } from "./schemas/admin.schema";
import { Model } from 'mongoose';
import { SignUpadminDto } from "./dto/signup.admin.dto";
import { LoginadminDto } from "./dto/login.admin.dto";
import { JwtService } from '@nestjs/jwt';
import { IdService } from "./id/id_components";
export declare class AuthService {
    private adminModel;
    private jwtService;
    private idService;
    constructor(adminModel: Model<Admin>, jwtService: JwtService, idService: IdService);
    signUp_admin(SignUpadminDto: SignUpadminDto): Promise<{
        token: String;
    }>;
    login_admin(LoginadminDto: LoginadminDto): Promise<{
        token: String;
    }>;
    validateToken(token: string): Promise<{
        valid: boolean;
    }>;
}
