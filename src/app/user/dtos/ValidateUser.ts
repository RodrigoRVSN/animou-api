import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
