import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { SignInInterface } from 'src/modules/auth/interfaces/auth.interface';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    private authService: AuthService
  ){
    super({ usernameField: "email"})
  }

  async validate(email: string, password:string): Promise<Partial<User>> {
    const user = await this.authService.validateUser({email, password})

    if (!user) {
      throw new HttpException("Credentials not valid", HttpStatus.BAD_REQUEST)
    }

    return user
  }
}