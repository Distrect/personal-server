import { Injectable } from '@nestjs/common';
import { IAuthCookie } from '@util/util.interface';
import { writeFileSync } from 'fs';

@Injectable()
export default class FileService {
  private storageLocation = './upload';
  constructor() {}

  public uploadFile(file: Express.Multer.File, type: 'IMAGE') {
    const fileType = file.mimetype.split('/')[1];
    const fileName = [
      Date.now() + '-' + Math.round(Math.random() * 1e9),
      type,
    ].join('-');
    const fullPath = [
      this.storageLocation,
      'image',
      fileName + `.${fileType}`,
    ].join('/');

    writeFileSync(fullPath, file.buffer);

    return fullPath;
  }
}
