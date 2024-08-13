import ExperienceEntity from '@model/experience/experience.entity';
import {
  ICreateExperience,
  IUpdateExperience,
} from '@model/experience/experience.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleOrArray } from '@util/util.interface';
import { Repository } from 'typeorm';

@Injectable()
export default class ExperienceDAO {
  constructor(
    @InjectRepository(ExperienceEntity)
    private experienceRepo: Repository<ExperienceEntity>,
  ) {}

  public async createExperience(createData: SingleOrArray<ICreateExperience>) {
    if (Array.isArray(createData)) {
      return await this.experienceRepo.save(
        this.experienceRepo.create(createData),
      );
    }

    const newExperience = this.experienceRepo.create(createData);
    return this.experienceRepo.save(newExperience);
  }

  public async updateExperience(updateData: SingleOrArray<IUpdateExperience>) {
    if (Array.isArray(updateData)) {
      return await this.experienceRepo.save(updateData);
    }

    return await this.experienceRepo.save(updateData);
  }

  public async deleteExperience(data: SingleOrArray<number>) {
    await this.experienceRepo.delete(data);
  }
}
