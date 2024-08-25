import { AppConfig } from '@config/load.yaml';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class EnvironmentService {
  constructor(private configService: ConfigService) {}

  public getDatabaseConfig() {
    return this.configService.get<AppConfig['database']>('database');
  }

  public getJwtSecret() {
    return this.configService.get<AppConfig['jwt']>('jwt').secret;
  }

  public getCookieSecret() {
    return this.configService.get<AppConfig['cookie']>('cookie').secret;
  }

  public getAppConfig() {
    return this.configService.get<AppConfig['app']>('app');
  }
}
