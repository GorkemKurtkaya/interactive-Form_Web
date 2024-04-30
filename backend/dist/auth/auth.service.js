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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_schema_1 = require("./schemas/admin.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const id_components_1 = require("./id/id_components");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(adminModel, jwtService, idService) {
        this.adminModel = adminModel;
        this.jwtService = jwtService;
        this.idService = idService;
    }
    async signUp_admin(SignUpadminDto) {
        const { name, email, password } = SignUpadminDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await this.adminModel.create({
            _id: this.idService.generateId(),
            name,
            email,
            password: hashedPassword,
        });
        const token = this.jwtService.sign({ id: admin._id });
        return { token };
    }
    async login_admin(LoginadminDto) {
        const { email, password } = LoginadminDto;
        const admin = await this.adminModel.findOne({ email });
        if (!admin) {
            throw new common_2.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatched) {
            throw new common_2.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({ id: admin._id });
        return { token };
    }
    async validateToken(token) {
        try {
            const decodedToken = jwt.verify(token, 'topSecret');
            return { valid: true };
        }
        catch (error) {
            return { valid: false };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        id_components_1.IdService])
], AuthService);
//# sourceMappingURL=auth.service.js.map