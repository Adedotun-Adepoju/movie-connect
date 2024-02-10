import { Injectable } from '@nestjs/common';
import { SignUpInterface } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(){}

  async signUp(payload: SignUpInterface){
    console.log({ payload })
  }

  async signIn() {

  }

  async validateUser() {

  }
}
