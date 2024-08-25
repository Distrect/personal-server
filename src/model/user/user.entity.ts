import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IUserAddress } from './user.entity.interface';
import { ChangeDate } from '@model/index';
import SkillEntity from '@model/skill/skill.entity';
import PortfolioEntity from '@model/portfolio/portfolio.entity';

@Entity('user')
export default class UserEntity extends ChangeDate {
  @Index()
  @PrimaryGeneratedColumn()
  userID: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  fullname: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('date')
  birthDate: Date;

  @Column('json', { nullable: true })
  address: IUserAddress | null;

  @Column('varchar', { nullable: true })
  title: string | null;

  @Column('varchar', { nullable: true })
  phoneNumber: string | null;

  @Column('varchar', { nullable: true })
  profileImage: string | null;

  @OneToOne(() => PortfolioEntity, (portfolioEntity) => portfolioEntity.user)
  @JoinColumn()
  portfolio: SkillEntity[];

  @BeforeInsert()
  public setFullName() {
    this.fullname = [this.name, this.lastname].join(' ');
  }
}
