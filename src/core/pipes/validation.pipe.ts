import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ServerError, ValueValidationError } from '@util/error';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype, type }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    switch (type) {
      case 'body':
        return this.body(metatype, value);
      case 'query':
        throw new Error('Query Not Implemented');
      case 'param':
        throw new Error('Param Not Implemented');
      case 'custom':
        throw new Error('Custom Not Implemented');

      default:
        throw new Error('Critic Error');
    }
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.reduce((acc, err) => {
      const { property } = err;
      const constraints = Object.values(err.constraints);
      acc[property] = constraints[0];
      return acc;
    }, {});
  }

  private async body(metatype: any, value: any) {
    console.log('Body Value', value);
    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: true,
    });
    console.log('Transformed', object);
    const errors = await validate(object);
    console.log('err', errors);
    if (errors.length > 0) {
      throw new ValueValidationError(undefined, this.formatErrors(errors));
    }

    return object;
  }
}
