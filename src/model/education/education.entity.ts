import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EducationStatus } from '@model/education/education.interface';
import { ChangeDate } from '@model/index';
import { IsNumber, Max, Min } from 'class-validator';
import PortfolioEntity from '@model/portfolio/portfolio.entity';

@Entity('education')
export default class EducationEntity extends ChangeDate {
  @PrimaryGeneratedColumn()
  educationID: number;

  @Column()
  institution: string;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @IsNumber()
  @Min(0)
  @Max(4)
  @Column('integer')
  gpa: number;

  @Column('enum', {
    enum: EducationStatus,
    enumName: 'EducationStatus',
    nullable: true,
  })
  status: EducationStatus | null;

  @ManyToOne(
    () => PortfolioEntity,
    (portfolioEntity) => portfolioEntity.educations,
  )
  portfolio: PortfolioEntity;
}
