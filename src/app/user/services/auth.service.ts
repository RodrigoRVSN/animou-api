import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/database/db.service';

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  findByEmail(email: string) {
    return this.Prisma.user.findFirst({ where: { email: { equals: email } } });
  }

  async login(user: User) {
    const payload = { username: user, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
