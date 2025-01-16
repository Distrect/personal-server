import { IPortfolioEntity } from '@model/portfolio/portfolio.interface';

export interface IExperienceEntity {
  experienceID: number;
  company: string;
  startDate: Date;
  endDate: Date;
  title: string;
  description: string;
  portfolio: IPortfolioEntity;
}

export interface ICreateExperience {
  experienceID: number;
  company: string;
  startDate: Date;
  endDate: Date;
  title: string;
  description: string;
}

export interface IUpdateExperience {
  experienceID: number;
  company?: string;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  description?: string;
}
