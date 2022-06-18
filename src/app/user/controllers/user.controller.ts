import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/core/dtos/CreateUserDto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const foundByEmail = await this.appService.findByEmail(createUserDto.email);

    if (!!foundByEmail) {
      return response
        .status(400)
        .json({ message: 'This e-mail already exists!' });
    }

    const foundByUsername = await this.appService.findByUsername(
      createUserDto.username,
    );

    if (!!foundByUsername) {
      return response
        .status(400)
        .json({ message: 'This username already exists!' });
    }

    await this.appService.createUser(createUserDto);
    return response.status(201).json({ message: 'User has been created!' });
  }
}
