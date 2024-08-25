import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import AuthModule from '@core/auth/auth.module';
import UserEntityModule from '@model/user/user.entity.module';
import UserBusinessService from '@business/user/user.business.service';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';
import UserBusinessController from '@business/user/user.business.controller';
import FileModule from '@model/file/file.module';

@Module({
  imports: [UserEntityModule, AuthModule, FileModule],
  providers: [UserBusinessService],
  controllers: [UserBusinessController],
})
export default class UserBusinessModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/register', method: RequestMethod.POST },
      )
      .forRoutes(UserBusinessController);
  }
}
