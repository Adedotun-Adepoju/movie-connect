import { Injectable } from '@nestjs/common';
import { SignInInterface, SignUpInterface } from './interfaces/auth.interface';
import { ResponseInterface } from 'src/helper/response.helper';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ){}

  async signUp(payload: SignUpInterface): Promise<ResponseInterface>{

    return {
      status: "success",
      status_code: 201,
      message: "User created successfully",
      data: []
    }
  }

  async signIn(payload: SignInInterface) {
    const email = payload.email;

    const user = await this.userService.findUserByEmail(email)
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
