import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    UnauthorizedException,
    Headers,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignUpadminDto } from './dto/signup.admin.dto';
  import { LoginadminDto } from './dto/login.admin.dto';
  import { Admin } from './schemas/admin.schema';
  // AuthController sınıfı, AuthController sınıfı, AuthService sınıfının kullanılmasını sağlayan sınıf.
  
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    //Kullanıcı kaydı
    @Post('/signup_admin')
    signUp_user(@Body() SignUpDto: SignUpadminDto): Promise<{ token: String }> {
      return this.authService.signUp_admin(SignUpDto);
    }
  
    //Kullanıcı girişi
    @Post('/login_admin')
    login_user(@Body() loginDto: LoginadminDto): Promise<{ token: String }> {
      return this.authService.login_admin(loginDto);
    }

    @Post('/validate_token')
    validateToken(@Body('token') token: string): { valid: boolean } {
    return this.validateToken(token);
  }
}