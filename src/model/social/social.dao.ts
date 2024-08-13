import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SocialEntity from '@model/social/social.entity';
import { SingleOrArray } from '@util/util.interface';
import { ICreateSocial, IUpdateSocial } from '@model/social/social.interface';

@Injectable()
export default class SocialDAO {
  constructor(
    @InjectRepository(SocialEntity)
    private socialRepo: Repository<SocialEntity>,
  ) {}

  public async createSocial(createData: SingleOrArray<ICreateSocial>) {
    if (Array.isArray(createData)) {
      return await this.socialRepo.save(this.socialRepo.create(createData));
    }

    const newSocial = this.socialRepo.create(createData);
    return this.socialRepo.save(newSocial);
  }

  public async updateSocial(updateData: SingleOrArray<IUpdateSocial>) {
    if (Array.isArray(updateData)) {
      return await this.socialRepo.save(updateData);
    }

    return await this.socialRepo.save(updateData);
  }

  public async deleteSocial(data: SingleOrArray<number>) {
    await this.socialRepo.delete(data);
  }
}
