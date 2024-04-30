import {
    IsEmpty,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,MinLength
  } from 'class-validator';
  
  // DTO for sign up
  export class SignUpadminDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsEmail({},{message: 'Please enter correct email.'})
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
  }