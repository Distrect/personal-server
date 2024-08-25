import { Injectable, Logger } from '@nestjs/common';
import { UpdatePortfolioDTO } from '@business/portfolio/portfolio.business.dto';
import SkillDAO from '@model/skill/skill.dao';
import EducationDAO from '@model/education/education.dao';
import ExperienceDAO from '@model/experience/experience.dao';
import PortfolioDAO from '@model/portfolio/portfolio.dao';
import SocialDAO from '@model/social/social.dao';

@Injectable()
export default class PortfolioBusinessService {
  private readonly logger = new Logger();

  constructor(
    private portfolioDAO: PortfolioDAO,
    private experienceDAO: ExperienceDAO,
    private educationDAO: EducationDAO,
    private skillDAO: SkillDAO,
    private socialDAO: SocialDAO,
  ) {}

  private async sperateChanges<T extends {}>(data: T[], identifier: keyof T) {
    const create: T[] = [];
    const update: T[] = [];
    const deleted: T[] = [];

    for (const curr of data) {
      if (curr[identifier]) update.push(curr);
      else if (curr['deleted'] && curr[identifier])
        deleted.push(curr[identifier] as any);
      else create.push(curr);
    }

    return { create, update, deleted } as any;
  }

  public async getUserPortfolio(userID: number) {
    const portfolio = await this.portfolioDAO.getUserPortfolio(userID);

    return portfolio;
  }

  public async updatePortfolio({
    userID,
    portfolioID,
    educationData,
    experienceData,
    portfolioData,
    skillData,
    socialData,
  }: UpdatePortfolioDTO) {
    try {
      const reqArr = [];

      if (skillData) {
        const separeted = await this.sperateChanges(skillData, 'skillID');
        reqArr.push(
          this.skillDAO.createSkill(separeted.create),
          this.skillDAO.updateSkill(separeted.update),
          this.skillDAO.deleteSkill(separeted.deleted),
        );
      }

      if (socialData) {
        const separeted = await this.sperateChanges(socialData, 'socialID');
        reqArr.push(
          this.socialDAO.createSocial(separeted.create),
          this.socialDAO.updateSocial(separeted.update),
          this.socialDAO.deleteSocial(separeted.deleted),
        );
      }

      if (educationData) {
        const { create, update, deleted } = await this.sperateChanges(
          educationData,
          'educationID',
        );

        reqArr.push(
          this.educationDAO.createEducation(create),
          this.educationDAO.updateEducation(update),
          this.educationDAO.deleteEducation(deleted),
        );
      }

      if (experienceData) {
        const { create, update, deleted } = await this.sperateChanges(
          experienceData,
          'experienceID',
        );

        reqArr.push(
          this.experienceDAO.createExperience(create),
          this.experienceDAO.updateExperience(update),
          this.experienceDAO.deleteExperience(deleted),
        );
      }

      if (portfolioData) {
        reqArr.push(
          this.portfolioDAO.updatePortfolio({ portfolioID, ...portfolioData }),
        );
      }

      await Promise.all(reqArr);

      return await this.portfolioDAO.getUserPortfolio(userID);
    } catch (error) {
      this.logger.error(
        'Update Portfolio Error',
        error,
        'Portfolio Business Service',
      );
      console.error(`[Error]: `, error);
      throw error;
    }
  }
}
