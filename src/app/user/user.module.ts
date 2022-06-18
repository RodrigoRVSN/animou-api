import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/db.service';
import { jwtConstants } from 'src/core/utils/auth/constants';
import { AuthController, UserController } from './controllers';
import { AuthService, UserService } from './services';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, PrismaService],
})
export class UserModule {}
