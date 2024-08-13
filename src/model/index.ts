import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class ChangeDate {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
