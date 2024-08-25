import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import PortfolioBusinessService from '@business/portfolio/portfolio.business.service';
import PortfolioEntityModule from '@model/portfolio/portfolio.entity.module';
import SkillEntityModule from '@model/skill/skill.entity.module';
import ExperienceEntityModule from '@model/experience/experience.entity.module';
import EducationEntityModule from '@model/education/education.entity.module';
import SocialEntityModule from '@model/social/social.module';
import PortfolioBusinessController from '@business/portfolio/portfolio.business.controller';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';
import AuthModule from '@core/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    PortfolioEntityModule,
    SkillEntityModule,
    ExperienceEntityModule,
    EducationEntityModule,
    SocialEntityModule,
  ],
  controllers: [PortfolioBusinessController],
  providers: [PortfolioBusinessService],
  exports: [PortfolioBusinessService],
})
export default class PortfolioBusinessModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(PortfolioBusinessController);
  }
}
