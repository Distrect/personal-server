import AuthService from '@core/auth/auth.service';
import EnvironmentModule from '@core/config/environment.module';
import EnvironmentService from '@core/config/environment.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (envService) => ({ secret: envService.getJwtSecret() }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export default class AuthModule {}
