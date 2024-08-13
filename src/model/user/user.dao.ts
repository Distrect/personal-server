import UserEntity from '@model/user/user.entity';
import {
  ICreateUser,
  IUpdateUserData,
  WhereUser,
} from '@model/user/user.entity.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from '@util/error';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export default class UserDAO {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  public async chekIfUserExist(where: WhereUser) {
    try {
      return await this.getUser(where);
    } catch (error) {
      if (error.code === 404) return false;

      throw error;
    }
  }

  public async getUser(where: WhereUser) {
    const user = await this.userRepo.findOne({
      where,
    });

    if (user === null) throw new NotFoundError('User not  found');

    return user;
  }

  public async createUser(data: ICreateUser) {
    const newUser = this.userRepo.create(data);

    return await this.userRepo.save(newUser);
  }

  public async getUserData(where: WhereUser) {
    const user = await this.userRepo.findOne({
      where,
      select: {
        password: false,
      },
    });

    if (user === null) throw new NotFoundError('User not found');

    return user;
  }

  public async updateUser(userID: number, updatedData: IUpdateUserData) {
    const user = await this.getUser({ userID });

    return await this.userRepo.save(Object.assign(user, updatedData));
  }
}
