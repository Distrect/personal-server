import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserListener } from '@model/user/user.subscriber';
import EnvironmentModule from '@core/config/environment.module';
import EnvironmentService from '@core/config/environment.service';
import EducationEntity from '@model/education/education.entity';
import UserEntity from '@model/user/user.entity';
import PortfolioEntity from '@model/portfolio/portfolio.entity';
import SkillEntity from '@model/skill/skill.entity';
import ExperienceEntity from '@model/experience/experience.entity';
import UserBusinessModule from '@business/user/user.business.module';
import PortfolioBusinessModule from '@business/portfolio/portfolio.business.module';

@Module({
  imports: [
    EnvironmentModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (envService) => ({
        ...envService.getDatabaseConfig(),
        synchronize: true,
        entities: [
          UserEntity,
          PortfolioEntity,
          SkillEntity,
          EducationEntity,
          ExperienceEntity,
        ],
        subscribers: [UserListener],
      }),
    }),
    UserBusinessModule,
    PortfolioBusinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
