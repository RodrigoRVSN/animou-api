import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CreateUserDto, ValidateEmailDto } from '../dtos';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('validate-email')
  @HttpCode(204)
  async validateEmail(@Body() createUserDto: ValidateEmailDto) {
    const foundByEmail = await this.appService.findByEmail(createUserDto.email);

    if (!!foundByEmail) {
      throw new BadRequestException('This e-mail already exists!');
    }

    return;
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const foundByUsername = await this.appService.findByUsername(
      createUserDto.username,
    );

    if (!!foundByUsername) {
      throw new BadRequestException('This username already exists!');
    }

    await this.appService.createUser(createUserDto);
    return 'User has been created!';
  }
}
