import { IPortfolioEntity } from '@model/portfolio/portfolio.interface';

export interface ISocialEntity {
  socialID: number;
  name: string;
  link: string;
  portfolio: IPortfolioEntity;
}

export interface ICreateSocial {
  socialID: number;
  name: string;
  link: string;
}

export interface IUpdateSocial {
  socialID: number;
  name?: string;
  link?: string;
}
