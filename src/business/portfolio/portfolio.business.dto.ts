import { DeepPartial } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { IUpdateEducation } from '@model/education/education.interface';
import { IUpdateExperience } from '@model/experience/experience.interface';
import { IUpdatePortfolio } from '@model/portfolio/portfolio.interface';
import { IUpdateSkill } from '@model/skill/skill.interface';
import { IUpdateSocial } from '@model/social/social.interface';

interface IsDeleted {
  deleted: true;
}

export class UpdatePortfolioDTO {
  @IsNotEmpty()
  userID: number;
  @IsNotEmpty()
  portfolioID: number;
  @IsOptional()
  portfolioData?: Omit<IUpdatePortfolio, 'portfolioID'>;
  @IsOptional()
  educationData?: DeepPartial<IUpdateEducation & IsDeleted>[];
  @IsOptional()
  experienceData?: DeepPartial<IUpdateExperience & IsDeleted>[];
  @IsOptional()
  skillData?: DeepPartial<IUpdateSkill & IsDeleted>[];
  @IsOptional()
  socialData?: DeepPartial<IUpdateSocial & IsDeleted>[];
}

type z = (string | number)[];
