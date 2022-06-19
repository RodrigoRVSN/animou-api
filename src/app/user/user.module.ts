import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/db.service';
import { jwtConstants } from 'src/core/utils/auth/constants';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthController, UserController } from './controllers';
import { AuthService, UserService } from './services';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' }, // 7 days
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, PrismaService, JwtStrategy],
})
export class UserModule {}
