import { IEducationEntity } from '@model/education/education.interface';
import { IExperienceEntity } from '@model/experience/experience.interface';
import { ISKillEntity } from '@model/skill/skill.interface';
import { ISocialEntity } from '@model/social/social.interface';
import { IUserEntity } from '@model/user/user.entity.interface';

export interface IPortfolioEntity {
  portfolioID: number;
  background: string | null;
  cover: string | null;
  user: IUserEntity;
  educations: IEducationEntity[];
  experiences: IExperienceEntity[];
  skills: ISKillEntity[];
  socials: ISocialEntity[];
}

export class IUpdatePortfolio {
  portfolioID: number;
  cover?: string;
  background?: string;
}
