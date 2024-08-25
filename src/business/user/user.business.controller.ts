import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from '@business/user/user.dto';
import { Response } from 'express';
import AuthService from '@core/auth/auth.service';
import UserBusinessService from '@business/user/user.business.service';
import { Cookies, IAuthCookie } from '@util/util.interface';
import { User } from 'src/middlewares/authorization.middleware';
import {
  LogActivity,
  LogInterceptor,
} from '@core/interceptors/log.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { NotFoundError } from '@util/error';

const fileValidation = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'image/jpg' })
  .addFileTypeValidator({ fileType: 'image/jpeg' })
  .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });

@UseInterceptors(LogInterceptor)
@Controller('user')
export default class UserBusinessController {
  constructor(
    private userService: UserBusinessService,
    private authService: AuthService,
  ) {}

  @LogActivity('Login Requested')
  @Post('login')
  public async login(
    @Res({ passthrough: true }) response: Response,
    @Body() requestBody: LoginUserDTO,
  ) {
    const payload = await this.userService.login(requestBody);
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60;
    const token = this.authService.signData(payload, { expiresIn: oneHour });
    response.cookie(Cookies.AUTHENTICATION, token, { maxAge: oneDay });

    return {
      successful: true,
      message: 'Succesfully loged in',
      data: {
        user: payload,
      },
    };
  }

  @LogActivity('Register Requested')
  @Post('register')
  public async register(@Body() requestBody: RegisterUserDTO) {
    await this.userService.register(requestBody);

    return {
      successful: true,
      message: 'Succesfully registered',
      data: null,
    };
  }

  @LogActivity('User Information Requested')
  @Get('userInfo')
  public async getUserData(@User() userData: IAuthCookie) {
    const user = await this.userService.getUserData(userData.userID);

    return {
      successful: true,
      message: 'User details successfully fetched',
      data: { user },
    };
  }

  @LogActivity('Profile Image Requested')
  @Get('profileImage')
  public async getProfileImage(
    @User() userData: IAuthCookie,
  ): Promise<StreamableFile> {
    const user = await this.userService.getUserData(userData.userID);
    if (!user.profileImage)
      throw new NotFoundError('User profile image is empty');

    const file = createReadStream(user.profileImage);

    return new StreamableFile(file);
  }

  @LogActivity('Profile Image Updated')
  @Post('profileImage')
  @UseInterceptors(FileInterceptor('profileImage'))
  public async updateProfileImage(
    @User() userData: IAuthCookie,
    @UploadedFile(fileValidation)
    profileImage: Express.Multer.File,
  ) {
    await this.userService.uploadProfileImage(userData, profileImage);

    return {
      ok: true,
      message: 'Profile image succesfully uploaded',
      data: null,
    };
  }

  @LogActivity('User Information Updated')
  @Post('userInfo')
  public async updateUserData(
    @User() userData: IAuthCookie,
    @Body() requestBody: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUserInfo(
      userData.userID,
      requestBody,
    );

    return {
      successful: true,
      message: 'User details successfully updated',
      data: { user },
    };
  }
}
