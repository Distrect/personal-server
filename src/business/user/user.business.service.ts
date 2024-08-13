import { HttpStatus, Injectable } from '@nestjs/common';
import { AppError } from '@util/error';
import AuthService from '@core/auth/auth.service';
import UserDAO from '@model/user/user.dao';
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from '@business/user/user.dto';

@Injectable()
export default class UserBusinessService {
  constructor(
    private userDao: UserDAO,
    private authService: AuthService,
  ) {}

  public async register(userData: RegisterUserDTO) {
    const { email, password } = userData;

    const isUserExist = await this.userDao.chekIfUserExist({ email, password });

    if (isUserExist)
      throw new AppError(
        'Account already exist with given email',
        HttpStatus.CONFLICT,
      );

    userData.password = this.authService.encryptValue(userData.password);

    return await this.userDao.createUser(userData);
  }

  public async login({ email, password }: LoginUserDTO) {
    const user = await this.userDao.getUser({ email });

    if (
      this.authService.compareEncryptedValue(password, user.password) === false
    )
      throw new AppError('Passwrod is incorrect', HttpStatus.BAD_REQUEST);

    return user;
  }

  public async getUserData(userID: number) {
    return await this.userDao.getUser({ userID });
  }

  public async updateUserInfo(userID: number, updatedData: UpdateUserDTO) {
    return await this.userDao.updateUser(userID, updatedData);
  }

  public async logout() {}
}
