import ExperienceDAO from '@model/experience/experience.dao';
import ExperienceEntity from '@model/experience/experience.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity])],
  providers: [ExperienceDAO],
  exports: [ExperienceDAO],
})
export default class ExperienceEntityModule {}
