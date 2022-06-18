import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/db.service';
import { CreateUserDto } from 'src/core/dtos/CreateUserDto';
import { encryptPassword } from 'src/core/utils/auth/crypto';

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

  async createUser(createUserDto: CreateUserDto) {
    const password = await encryptPassword(createUserDto.password);

    return this.Prisma.user.create({ data: { ...createUserDto, password } });
  }
}
