import UserDAO from '@model/user/user.dao';
import UserEntity from '@model/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserDAO],
  exports: [UserDAO],
})
export default class UserEntityModule {}
