import ActivityService from '@core/activity/activity.service';
import LogEntityModule from '@model/log/log.entity.module';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [LogEntityModule],
  providers: [ActivityService],
  exports: [ActivityService],
})
export default class ActivityModule {}
