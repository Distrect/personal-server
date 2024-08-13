import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export default class AuthService {
  constructor() {}

  public encryptValue(value: string) {
    return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
  }

  public compareEncryptedValue(plainValue: string, hash: string) {
    return bcrypt.compareSync(plainValue, hash);
  }
}
