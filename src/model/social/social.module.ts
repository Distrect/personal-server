import SocialDAO from '@model/social/social.dao';
import SocialEntity from '@model/social/social.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SocialEntity])],
  providers: [SocialDAO],
  exports: [SocialDAO],
})
export default class SocialEntityModule {}
