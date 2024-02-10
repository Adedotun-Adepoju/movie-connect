import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../guards/jwt.strategy';
import { PasswordReset } from 'src/entities/password_reset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
@Module({
  imports: [
    UserModule,
    PassportModule,
    MailModule,
    TypeOrmModule.forFeature([PasswordReset, User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRY },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, MailService]
})
export class AuthModule {}
