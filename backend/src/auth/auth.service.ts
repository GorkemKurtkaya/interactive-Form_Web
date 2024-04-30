import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { Model } from 'mongoose';
import { SignUpadminDto } from "./dto/signup.admin.dto";
import * as bcrypt from 'bcryptjs';
import { LoginadminDto } from "./dto/login.admin.dto";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IdService } from "./id/id_components";
import * as jwt from 'jsonwebtoken';


@Injectable()
    export class AuthService {
        constructor(
            @InjectModel(Admin.name)
            private adminModel: Model<Admin>,
            private jwtService: JwtService,
            private idService: IdService,
        ) {}




        //admin kayıt
        async signUp_admin(SignUpadminDto:SignUpadminDto):Promise<{token:String}> {

            const{name,email,password} = SignUpadminDto;
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const admin = await this.adminModel.create({
                _id: this.idService.generateId(),
                name,
                email,
                password:hashedPassword,
            });
        
        
            const token = this.jwtService.sign({id:admin._id})
        
            return {token};
          }


          //admin Girişi
        async login_admin(LoginadminDto: LoginadminDto): Promise<{token:String}> {
            const{email,password} = LoginadminDto;
        
            const admin = await this.adminModel.findOne({email})
        
            if(!admin){
              throw new UnauthorizedException('Invalid email or password');
            }
        
            const isPasswordMatched = await bcrypt.compare(password, admin.password);
            
            if(!isPasswordMatched){
              throw new UnauthorizedException('Invalid email or password');
            }
            
            const token = this.jwtService.sign({id:admin._id})
            
            
            return {token};
          }

          
          async validateToken(token: string): Promise<{ valid: boolean }> {
            try {
              // Tokenı doğrula
              const decodedToken = jwt.verify(token, 'topSecret'); // JWT'nin doğrulanması için kullanılan gizli anahtar burada yer almalıdır

              // Token geçerli ise valid:true döndür
              return { valid: true };
            } catch (error) {
              // Token doğrulanamazsa veya hatalı ise valid:false döndür
              return { valid: false };
            }
          }
          
    }

    