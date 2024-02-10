import { Injectable } from '@nestjs/common';
import { SignUpInterface } from './interfaces/auth.interface';
import { ResponseInterface } from 'src/helper/response.helper';

@Injectable()
export class AuthService {
  constructor(){}

  async signUp(payload: SignUpInterface): Promise<ResponseInterface>{
    console.log({ payload })

    return {
      status: "success",
      status_code: 201,
      message: "User created successfully",
      data: []
    }
  }

  async signIn(payload) {

    return {
      status: "success",
      status_code: 200,
      message: "Sign-in sucess",
      data: []
    }
  }

  async validateUser() {

  }
}
