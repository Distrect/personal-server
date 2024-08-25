import LogDAO from '@model/log/log.dao';
import LogEntity from '@model/log/log.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  providers: [LogDAO],
  exports: [LogDAO],
})
export default class LogEntityModule {}
