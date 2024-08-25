import { Injectable, Logger } from '@nestjs/common';
import { BadRequestError, ValueValidationError } from '@util/error';
import AuthService from '@core/auth/auth.service';
import UserDAO from '@model/user/user.dao';
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from '@business/user/user.dto';
import FileService from '@model/file/file.service';
import { IUpdateUserData } from '@model/user/user.entity.interface';
import { IAuthCookie } from '@util/util.interface';

@Injectable()
export default class UserBusinessService {
  private logger = new Logger();
  constructor(
    private userDao: UserDAO,
    private authService: AuthService,
    private fileService: FileService,
  ) {}

  public async register(userData: RegisterUserDTO) {
    try {
      const { email, password } = userData;

      const isUserExist = await this.userDao.chekIfUserExist({
        email,
      });

      console.log(isUserExist);

      if (isUserExist) throw new BadRequestError('Account already exist');

      userData.password = this.authService.encryptValue(userData.password);

      return await this.userDao.createUser(userData);
    } catch (error) {
      this.logger.error(
        'Register user error',
        error?.stack,
        'Business Service',
      );
      console.error(error);
      throw error;
    }
  }

  public async login({ email: userEmail, password }: LoginUserDTO) {
    const user = await this.userDao.getUser({ email: userEmail });

    if (
      this.authService.compareEncryptedValue(password, user.password) === false
    )
      throw new ValueValidationError(undefined, {
        password: 'Password is incorrect',
      });

    const { userID, name, lastname, email } = user;

    return { userID, name, lastname, email };
  }

  public async getUserData(userID: number) {
    return await this.userDao.getUser({ userID });
  }

  public async updateUserInfo(userID: number, updatedData: UpdateUserDTO) {
    return await this.userDao.updateUser(userID, updatedData);
  }

  public async uploadProfileImage(
    userData: IAuthCookie,
    profileImage: Express.Multer.File,
  ) {
    const profileImagePath = this.fileService.uploadFile(profileImage, 'IMAGE');

    await this.userDao.updateUser(userData.userID, {
      profileImage: profileImagePath,
    });
  }

  public async logout() {}
}
