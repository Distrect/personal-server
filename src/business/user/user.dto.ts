import {
  IUpdateUserData,
  IUserAddress,
} from '@model/user/user.entity.interface';
import {
  IsDate,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty({ message: 'Name cannot be empty', context: 'deneme' })
  name: string;

  @IsNotEmpty({ message: 'Lastname cannot be empty' })
  lastname: string;

  @IsDate({ message: 'Birthdate value should be date' })
  @IsNotEmpty({ message: 'BirthDate cannot be empty' })
  birthDate: Date;

  @IsEmail({}, { message: 'Email is wrong' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
    {
      message:
        'Password should contain at least 8 characters, 1 number, 1 symbol and 1 uppercase character ',
    },
  )
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}

export class LoginUserDTO {
  @IsEmail({}, { message: 'Email is wrong' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}

export class UpdateUserDTO implements IUpdateUserData {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastname?: string;

  @IsOptional()
  @IsDate({ message: 'Birthdate value should be date' })
  birthDate?: Date;

  @IsOptional()
  @IsEmail(undefined, { message: 'Email is wrong' })
  email?: string;

  @IsOptional()
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minSymbols: 1, minUppercase: 1 },
    {
      message:
        'Password should contain at least 8 characters, 1 number, 1 symbol and 1 uppercase character ',
    },
  )
  password?: string;

  @IsOptional()
  @IsJSON()
  address?: IUserAddress;

  @IsOptional()
  title?: string;
}
