import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/db.service';

@Injectable()
export class UserService {
  constructor(private Prisma: PrismaService) {}

  getUsers(): any {
    return this.Prisma.user.findMany();
  }
}
