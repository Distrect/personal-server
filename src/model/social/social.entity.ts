import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsUrl } from 'class-validator';
import PortfolioEntity from '@model/portfolio/portfolio.entity';

@Entity('social')
export default class SocialEntity {
  @PrimaryGeneratedColumn()
  socialID: number;

  @Column('varchar')
  name: string;

  @IsUrl()
  @Column('varchar')
  link: string;

  @ManyToOne(
    () => PortfolioEntity,
    (portfolioEntity) => portfolioEntity.socials,
  )
  portfolio: PortfolioEntity;
}
