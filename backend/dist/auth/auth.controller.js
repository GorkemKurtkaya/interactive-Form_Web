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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_admin_dto_1 = require("./dto/signup.admin.dto");
const login_admin_dto_1 = require("./dto/login.admin.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp_user(SignUpDto) {
        return this.authService.signUp_admin(SignUpDto);
    }
    login_user(loginDto) {
        return this.authService.login_admin(loginDto);
    }
    validateToken(token) {
        return this.validateToken(token);
    }
    async getCompanyByToken(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Geçersiz veya eksik yetki bilgisi');
        }
        const token = authHeader.split(' ')[1];
        return this.authService.getAdminByToken(token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signup_admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_admin_dto_1.SignUpadminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp_user", null);
__decorate([
    (0, common_1.Post)('/login_admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginadminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login_user", null);
__decorate([
    (0, common_1.Post)('/validate_token'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Get)('/get_admin_by_token'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCompanyByToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map