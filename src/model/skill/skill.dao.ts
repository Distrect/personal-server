import SkillEntity from '@model/skill/skill.entity';
import { ICreateSkill, IUpdateSkill } from '@model/skill/skill.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleOrArray } from '@util/util.interface';
import { Repository } from 'typeorm';

@Injectable()
export default class SkillDAO {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepo: Repository<SkillEntity>,
  ) {}

  public async createSkill(createData: SingleOrArray<ICreateSkill>) {
    if (Array.isArray(createData)) {
      return await this.skillRepo.save(this.skillRepo.create(createData));
    }

    const newSkill = this.skillRepo.create(createData);
    return this.skillRepo.save(newSkill);
  }

  public async updateSkill(updateData: SingleOrArray<IUpdateSkill>) {
    if (Array.isArray(updateData)) {
      return await this.skillRepo.save(updateData);
    }

    return await this.skillRepo.save(updateData);
  }

  public async deleteSkill(data: SingleOrArray<number>) {
    await this.skillRepo.delete(data);
  }
}
