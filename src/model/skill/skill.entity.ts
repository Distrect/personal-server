import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import PortfolioEntity from '@model/portfolio/portfolio.entity';

@Entity('skill')
export default class SkillEntity {
  @PrimaryGeneratedColumn()
  skillID: number;

  @Column('varchar')
  skill: string;

  @Column('integer')
  profiency: number;

  @ManyToOne(
    () => PortfolioEntity,
    (portfolioEntity) => portfolioEntity.educations,
  )
  portfolio: PortfolioEntity;
}
