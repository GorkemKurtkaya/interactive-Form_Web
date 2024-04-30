import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
// import { ShopModule } from './shop/shop.module';
// import { UsersModule } from './users/users.module';

import { IdService } from 'src/auth/id/id_components';
import { FormModule } from './form/form.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Forms'),
    AuthModule,
    FormModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}