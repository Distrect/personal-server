import { Module } from '@nestjs/common';
import AuthModule from '@core/auth/auth.module';
import UserEntityModule from '@model/user/user.entity.module';
import UserBusinessService from '@business/user/user.business.service';

@Module({
  imports: [UserEntityModule, AuthModule],
  providers: [UserBusinessService],
  controllers: [],
})
export default class UserBusinessModule {}
