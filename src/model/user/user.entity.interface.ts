import type { ISKillEntity } from '@model/skill/skill.interface';
import type UserEntity from '@model/user/user.entity';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';

export type IUserPrimaryColumn = {
  userID: number;
};

export interface IUserEntity extends IUserPrimaryColumn {
  name: string;
  lastname: string;
  fullname: string;
  email: string;
  password: string;
  birthDate: Date;
  address: IUserAddress | null;
  title: string | null;
  phoneNumber: string | null;
  profileImage: string | null;
  portfolio: ISKillEntity[];
}

export interface IUserAddress {
  country: string;
  city: string;
  postal: string;
}

export interface ICreateUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthDate: Date;
}

export interface IUpdateUserData {
  name?: string;
  lastname?: string;
  birthDate?: Date;
  email?: string;
  password?: string;
  address?: IUserAddress;
  phoneNumber?: string;
  title?: string;
  profileImage?: string;
}

export interface IAuthUserColumns extends IUserPrimaryColumn {
  email: string;
  password: string;
}

export type WhereUser = FindOptionsWhere<UserEntity>;
export type SelectUser = FindOptionsSelect<UserEntity>;
