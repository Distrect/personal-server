import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(
    public message: string,
    public code: HttpStatus,
  ) {
    super(message, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Request is not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
