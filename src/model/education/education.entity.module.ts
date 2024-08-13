import EducationDAO from '@model/education/education.dao';
import EducationEntity from '@model/education/education.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EducationEntity])],
  providers: [EducationDAO],
  exports: [EducationDAO],
})
export default class EducationEntityModule {}
