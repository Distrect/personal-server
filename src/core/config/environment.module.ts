import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvironmentService from '@core/config/environment.service';
import yamlConfiguration from '@config/load.yaml';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [yamlConfiguration] }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export default class EnvironmentModule {}
