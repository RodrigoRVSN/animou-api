import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('create')
  async createUser(@Req() request: Request, @Res() response: Response) {
    const { email, password, name, username } = request.body;

    const foundByEmail = await this.appService.findByEmail(email);

    if (!!foundByEmail) {
      return response
        .status(400)
        .json({ message: 'This e-mail already exists!' });
    }

    const foundByUsername = await this.appService.findByUsername(username);

    if (!!foundByUsername) {
      return response
        .status(400)
        .json({ message: 'This username already exists!' });
    }

    await this.appService.createUser({ email, password, name, username });
    return response.status(201).json({ message: 'User has been created!' });
  }
}
