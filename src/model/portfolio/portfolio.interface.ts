import { EducationStatus } from '@model/education/education.interface';

interface IUpdateExperience {
  experienceID: number;
  company?: string;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  description?: string;
}

export class IUpdatePortfolio {
  portfolioID: number;
  cover?: string;
  background?: string;
}
