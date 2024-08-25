import FileService from '@model/file/file.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export default class FileModule {}
