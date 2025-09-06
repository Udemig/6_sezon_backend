import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    // Config module ile env değişkenlerini kullanılabilir hale getiriyoruz.
    ConfigModule.forRoot({ isGlobal: true }),
    // Mongoose module ile MongoDB'ye bağlanıyoruz.
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/nest'),
    UserModule,
    BlogModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
