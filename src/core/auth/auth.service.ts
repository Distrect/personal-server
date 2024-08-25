import { Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { errorHandler } from '@util/error';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

@Injectable()
export default class AuthService {
  private logger = new Logger();
  constructor(private jwtService: JwtService) {}

  public encryptValue(value: string) {
    return hashSync(value, genSaltSync(10));
  }

  public compareEncryptedValue(plainValue: string, hash: string) {
    return compareSync(plainValue, hash);
  }

  public signData(data: object, options?: JwtSignOptions) {
    return this.jwtService.sign(data, options);
  }

  public async verifyToken<T>(value: string, options?: JwtVerifyOptions) {
    return (await this.jwtService
      .verifyAsync(value, options)
      .catch((error) => errorHandler(error, true))) as T;
  }
}
