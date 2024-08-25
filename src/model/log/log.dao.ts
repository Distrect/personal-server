import LogEntity from '@model/log/log.entity';
import { ICreateLog } from '@model/log/log.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class LogDAO {
  constructor(
    @InjectRepository(LogEntity)
    private logRepo: Repository<LogEntity>,
  ) {}

  public async createLog(data: ICreateLog) {
    console.log('data', data);
    await this.logRepo.insert(data);
  }
}
