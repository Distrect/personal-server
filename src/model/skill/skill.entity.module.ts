import SkillDAO from '@model/skill/skill.dao';
import SkillEntity from '@model/skill/skill.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillDAO],
  exports: [SkillDAO],
})
export default class SkillEntityModule {}
