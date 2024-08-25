import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IRequestParams } from '@model/log/log.interface';

@Entity('log')
export default class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  activity: string;

  @Column('json')
  requestParams: IRequestParams;

  @Column('datetime')
  timestamp: Date;
}
