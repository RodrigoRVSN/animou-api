import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/db.service';
import { IRegisterUser } from 'src/core/types/IUser';

@Injectable()
export class UserService {
  constructor(private Prisma: PrismaService) {}

  getUsers() {
    return this.Prisma.user.findMany();
  }

  findByEmail(email: string) {
    return this.Prisma.user.findFirst({ where: { email: { equals: email } } });
  }

  findByUsername(username: string) {
    return this.Prisma.user.findFirst({
      where: { username: { equals: username } },
    });
  }

  createUser(data: IRegisterUser) {
    return this.Prisma.user.create({ data });
  }
}
