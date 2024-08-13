import { Module } from '@nestjs/common';
import PortfolioBusinessService from '@business/portfolio/portfolio.business.service';
import PortfolioEntityModule from '@model/portfolio/portfolio.entity.module';
import SkillEntityModule from '@model/skill/skill.entity.module';
import ExperienceEntityModule from '@model/experience/experience.entity.module';
import EducationEntityModule from '@model/education/education.entity.module';
import SocialEntityModule from '@model/social/social.module';

@Module({
  imports: [
    PortfolioEntityModule,
    SkillEntityModule,
    ExperienceEntityModule,
    EducationEntityModule,
    SocialEntityModule,
  ],
  providers: [PortfolioBusinessService],
  exports: [PortfolioBusinessService],
})
export default class PortfolioBusinessModule {}
