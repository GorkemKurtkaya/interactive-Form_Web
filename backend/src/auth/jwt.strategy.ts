import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Admin } from './schemas/admin.schema';


// JwtStrategy sınıfı, JwtStrategy sınıfı, PassportStrategy sınıfını extend eden sınıf.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "topSecret",
    });
  }

  async validate(payload) {
    const { id } = payload;

    const Admin = await this.adminModel.findById(id);

    if (!Admin) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return Admin;
  }
}