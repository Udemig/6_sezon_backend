import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { AccessStrategy } from './strategies/access.strategy';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, RefreshStrategy, AccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
