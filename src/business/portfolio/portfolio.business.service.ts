import { Injectable } from '@nestjs/common';
import { UpdatePortfolioDTO } from '@business/portfolio/portfolio.business.dto';
import SkillDAO from '@model/skill/skill.dao';
import EducationDAO from '@model/education/education.dao';
import ExperienceDAO from '@model/experience/experience.dao';
import PortfolioDAO from '@model/portfolio/portfolio.dao';
import SocialDAO from '@model/social/social.dao';

@Injectable()
export default class PortfolioBusinessService {
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
      console.log(`[Error]: `, error);
      throw error;
    }
  }
}

/*
  public async updatePortfolio({
    userID,
    portfolioID,
    educationData,
    experienceData,
    portfolioData,
    skillData,
  }: UpdatePortfolioDTO) {
    try {
      const experienceChange = this.sperateChanges(
        experienceData,
        'experienceID',
        this.experienceDAO.updateEducation,
        this.experienceDAO.createEducation,
      );
      const educationChange = this.sperateChanges(
        educationData,
        'educationID',
        this.educationDAO.updateEducation,
        this.educationDAO.createEducation,
      );

      const skillChange = this.sperateChanges(
        skillData,
        'skillID',
        this.skillDAO.updateSkill,
        this.skillDAO.updateSkill,
      );

      await Promise.all([
        ...experienceChange,
        ...educationChange,
        ...skillChange,
        ...(portfolioData
          ? [
              this.portfolioDAO.updatePortfolio({
                portfolioID,
                ...portfolioData,
              }),
            ]
          : []),
      ]);

      return await this.portfolioDAO.getUserPortfolio(userID);
    } catch (error) {
      console.log('[Error] error');
      throw error;
    }
  }
*/

// const skillChanges = await this.sperateChanges(skillData, 'skillID').then(
//   (res) =>
//     !res
//       ? []
//       : [
//           this.skillDAO.createSkill(res.create),
//           this.skillDAO.updateSkill(res.update),
//           this.skillDAO.deleteSkill(res.deleted),
//         ],
// );

// const experienceChanges = await this.sperateChanges(
//   experienceData,
//   'experienceID',
// ).then((res) =>
//   !res
//     ? []
//     : [
//         this.experienceDAO.createExperience(res.create),
//         this.experienceDAO.updateExperience(res.update),
//         this.experienceDAO.deleteExperience(res.deleted),
//       ],
// );

// const educationChanges = await this.sperateChanges(
//   educationData,
//   'educationID',
// ).then((res) =>
//   !res
//     ? []
//     : [
//         this.educationDAO.createEducation(res.create),
//         this.educationDAO.updateEducation(res.update),
//         this.educationDAO.deleteEducation(res.deleted),
//       ],
// );
