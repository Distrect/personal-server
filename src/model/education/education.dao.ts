import EducationEntity from '@model/education/education.entity';
import {
  ICreateEducation,
  IUpdateEducation,
} from '@model/education/education.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleOrArray } from '@util/util.interface';
import { Repository } from 'typeorm';

@Injectable()
export default class EducationDAO {
  constructor(
    @InjectRepository(EducationEntity)
    private educationRepo: Repository<EducationEntity>,
  ) {}

  public async createEducation(createData: SingleOrArray<ICreateEducation>) {
    if (Array.isArray(createData)) {
      return await this.educationRepo.save(
        this.educationRepo.create(createData),
      );
    }

    const newEducation = this.educationRepo.create(createData);
    return this.educationRepo.save(newEducation);
  }

  public async updateEducation(updateData: SingleOrArray<IUpdateEducation>) {
    if (Array.isArray(updateData)) {
      return await this.educationRepo.save(updateData);
    }

    return await this.educationRepo.save(updateData);
  }

  public async deleteEducation(data: SingleOrArray<number>) {
    await this.educationRepo.delete(data);
  }
}
