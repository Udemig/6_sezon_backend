import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AccessStrategy } from 'src/auth/strategies/access.strategy';
import { RefreshStrategy } from 'src/auth/strategies/refresh.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AccessStrategy, RefreshStrategy],
  exports: [UserService],
})
export class UserModule {}
