import type UserEntity from '@model/user/user.entity';
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm';

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
  title?: string;
}

export type WhereUser = FindOptionsWhere<UserEntity>;
export type SelectUser = FindOptionsSelect<UserEntity>;
