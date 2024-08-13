import PortfolioEntity from '@model/portfolio/portfolio.entity';
import { ChangeDate } from '@model/index';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('experience')
export default class ExperienceEntity extends ChangeDate {
  @PrimaryGeneratedColumn()
  experienceID: number;

  @Column('varchar')
  company: string;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(
    () => PortfolioEntity,
    (portfolioEntity) => portfolioEntity.educations,
  )
  portfolio: PortfolioEntity;
}
