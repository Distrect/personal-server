import { Injectable } from '@nestjs/common';
import LogDAO from '@model/log/log.dao';
import { ICreateLog } from '@model/log/log.interface';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export default class ActivityService {
  constructor(private logDAO: LogDAO) {}

  @OnEvent('newActivity', { async: true })
  public async createLog(data: ICreateLog) {
    try {
      await this.logDAO.createLog(data);
    } catch (error) {
      console.log('err', error);
    }
  }
}
