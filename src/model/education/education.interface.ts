import { IPortfolioEntity } from '@model/portfolio/portfolio.interface';

export enum EducationStatus {
  INPROGRESS = 'In Progress',
  GRADUATED = 'Graduated',
  DROPPED = 'Dropped',
}

export interface IEducationEntity {
  educationID: number;
  institution: string;
  startDate: Date;
  endDate: Date;
  gpa: number;
  status: EducationStatus | null;
  portfolio: IPortfolioEntity;
}

export interface ICreateEducation {
  educationID: number;
  institution: string;
  startDate: Date;
  endDate: Date;
  gpa: number;
  status?: EducationStatus;
}

export interface IUpdateEducation {
  educationID: number;
  institution?: string;
  startDate?: Date;
  endDate?: Date;
  gpa?: number;
  status?: EducationStatus;
}
