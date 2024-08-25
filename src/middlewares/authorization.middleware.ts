import {
  createParamDecorator,
  Injectable,
  NestMiddleware,
  ExecutionContext,
} from '@nestjs/common';
import { AuthorizationError, ServerError } from '@util/error';
import { Cookies, IAuthCookie } from '@util/util.interface';
import { Request, Response, NextFunction } from 'express';
import AuthService from '@core/auth/auth.service';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    let userData: IAuthCookie;

    const authCookie: string | null = req.cookies[Cookies.AUTHENTICATION];

    console.log('auth', authCookie);

    if (!authCookie) throw new AuthorizationError();

    try {
      userData = await this.authService.verifyToken<IAuthCookie>(authCookie);
    } catch (error) {
      if (error instanceof TokenExpiredError)
        return next(new AuthorizationError());

      return next(new ServerError());
    }

    res.cookie(Cookies.AUTHENTICATION, this.authService.signData(userData), {
      maxAge: 24 * 60 * 60 * 1000,
    });

    (req as any).user = userData;

    next();
  }
}

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  return user;
});
