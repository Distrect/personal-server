import { IPortfolioEntity } from '@model/portfolio/portfolio.interface';

export interface ISKillEntity {
  skillID: number;
  skill: string;
  profiency: number;
  portfolio: IPortfolioEntity;
}

export interface ICreateSkill {
  skill: string;
  profiency: number;
}

export interface IUpdateSkill {
  skillID: number;
  skill?: string;
  profiency?: number;
}
