import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTAccessStrategy } from './strategy/jwt-access.strategy';
import { JWTRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  // Dışarıdan gelen modülleri import ediyoruz
  imports: [JwtModule.register({}), PassportModule.register({})],
  // Servislerimizi export ediyoruz
  providers: [AuthService, JWTAccessStrategy, JWTRefreshStrategy],
  // Controller'ımızı export ediyoruz
  controllers: [AuthController],
})
export class AuthModule {}
