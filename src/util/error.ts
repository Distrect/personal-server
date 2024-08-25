import { HttpException, HttpStatus } from '@nestjs/common';
import { IFieldError } from '@util/util.interface';

export const errorHandler = (error: unknown, throwError = false) => {
  console.error(error);

  if (throwError) {
    throw error;
  }
};

export class AppError extends HttpException {
  constructor(
    public message: string,
    public code: HttpStatus,
  ) {
    super(message, code);
  }

  public transform() {
    const unwanted = ['options'];
    return Object.entries(this).reduce((acc, [key, val]) => {
      if (!unwanted.includes(key)) acc[key] = val;
      return acc;
    }, {});
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Request is not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Unaouthorized access. Please log in') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Reuqest has been made. Please try again alter') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class ServerError extends AppError {
  constructor(message = 'An unknown error has occured') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ValueValidationError extends AppError {
  constructor(
    message = 'Validation failed',
    public fieldErrors?: IFieldError,
  ) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
