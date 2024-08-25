import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppError } from '@util/error';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    if (exception instanceof AppError) {
      const errorResponse = exception.transform();
      const meta = {
        timestamp: new Date().toISOString(),
      };

      return response
        .status(errorResponse['status'] || errorResponse['code'] || 500)
        .json({ ...errorResponse, ...meta });
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'An unexpected error occurred.',
    };

    response.status(status).json(errorResponse);
  }
}
