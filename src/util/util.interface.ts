import type { Request } from 'express';

export enum Cookies {
  AUTHENTICATION = 'authentication',
  REFRESH = 'refresh',
}

export interface IAuthCookie {
  userID: number;
  name: string;
  lastName: string;
  email: string;
}

export type SingleOrArray<T> = T | T[];

export interface ExtendedRequest extends Request {
  user: IAuthCookie;
}

export interface IFieldError {
  [field: string]: string;
}
