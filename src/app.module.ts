import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
