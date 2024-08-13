import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import UserEntity from '@model/user/user.entity';
import EducationEntity from '@model/education/education.entity';
import ExperienceEntity from '@model/experience/experience.entity';
import SkillEntity from '@model/skill/skill.entity';
import SocialEntity from '@model/social/social.entity';

@Entity('portfolio')
export default class PortfolioEntity {
  @PrimaryGeneratedColumn()
  portfolioID: number;

  @Column('text')
  background: string;

  @Column('text')
  cover: string;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.portfolio)
  user: UserEntity;

  @OneToMany(
    () => EducationEntity,
    (educationEntity) => educationEntity.portfolio,
  )
  educations: EducationEntity[];

  @OneToMany(
    () => ExperienceEntity,
    (experienceEntity) => experienceEntity.portfolio,
  )
  experiences: ExperienceEntity[];

  @OneToMany(() => SkillEntity, (skillEntity) => skillEntity.portfolio)
  skills: SkillEntity[];

  @OneToMany(() => SocialEntity, (socialEntity) => socialEntity.portfolio)
  socials: SkillEntity[];
}
