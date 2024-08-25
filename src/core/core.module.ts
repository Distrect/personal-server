import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserListener } from '@model/user/user.subscriber';
import EnvironmentModule from '@core/config/environment.module';
import EnvironmentService from '@core/config/environment.service';
import EducationEntity from '@model/education/education.entity';
import UserEntity from '@model/user/user.entity';
import PortfolioEntity from '@model/portfolio/portfolio.entity';
import SkillEntity from '@model/skill/skill.entity';
import ExperienceEntity from '@model/experience/experience.entity';
import SocialEntity from '@model/social/social.entity';
import AuthModule from '@core/auth/auth.module';
import ActivityModule from '@core/activity/activity.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import LogEntity from '@model/log/log.entity';

@Module({
  imports: [
    EnvironmentModule,
    ActivityModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (envService) => ({
        ...envService.getDatabaseConfig(),
        // synchronize: true,
        // dropSchema: true,
        compression: true,
        entities: [
          UserEntity,
          PortfolioEntity,
          SkillEntity,
          EducationEntity,
          ExperienceEntity,
          SocialEntity,
          LogEntity,
        ],
        subscribers: [UserListener],
      }),
    }),
  ],
})
export default class CoreModule {}
