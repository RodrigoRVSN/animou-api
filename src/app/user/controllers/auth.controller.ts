import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { compareHash } from 'src/core/utils/auth/crypto';
import { ValidateUser } from '../dtos/ValidateUser';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async makeLogin(@Body() validateUser: ValidateUser) {
    const user = await this.authService.findByEmail(validateUser.email);

    if (!user) {
      throw new NotFoundException('This email was not found');
    }

    const isPasswordCorrect = await compareHash(
      validateUser.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Your credentials are incorrect!');
    }

    return this.authService.login(user);
  }
}
