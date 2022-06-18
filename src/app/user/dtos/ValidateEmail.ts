import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
