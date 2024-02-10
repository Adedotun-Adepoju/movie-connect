import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { SignInInterface } from 'src/modules/auth/interfaces/auth.interface';
import { User } from 'src/entities/user.entity';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
  constructor(
    private authService: AuthService
  ){
    super()
  }

  async validate(payload: SignInInterface): Promise<Partial<User>> {
    const user = await this.authService.validateUser(payload)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}