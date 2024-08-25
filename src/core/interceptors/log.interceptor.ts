import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { emptyOrNull } from '@util/util';
import { Request } from 'express';

export const LogActivity = Reflector.createDecorator<string>();

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private emitter: EventEmitter2,
  ) {}

  public intercept(context: ExecutionContext, next: CallHandler) {
    const request: Request = context.switchToHttp().getRequest();

    const activity = this.reflector.get(LogActivity, context.getHandler());
    console.log('Activity', activity);
    const timestamp = new Date();

    const requestParams = {
      method: request.method,
      params: emptyOrNull(request.params),
      query: emptyOrNull(request.query),
      body: emptyOrNull(request.body),
    };

    this.emitter.emit('newActivity', {
      activity,
      timestamp,
      requestParams,
    });

    return next.handle();
  }
}
