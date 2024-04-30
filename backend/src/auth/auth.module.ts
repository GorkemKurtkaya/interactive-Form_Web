// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import mongoose from 'mongoose';
import { JwtStrategy } from './jwt.strategy';
import { IdService } from './id/id_components';
import { Admin,AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: 'topSecret',
          signOptions: {
            expiresIn: '3d',
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
  ],
  controllers: [AuthController], // AuthController'ı tanımla
  providers: [AuthService, JwtStrategy, IdService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
