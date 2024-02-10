import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInInterface, SignUpInterface } from './interfaces/auth.interface';
import { ResponseInterface } from 'src/helper/response.helper';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ){}

  async signUp(payload: SignUpInterface): Promise<ResponseInterface>{
    const hashedPassword = await bcrypt.hash(payload.password, 10)

    const existingUser = await this.userService.findUserByEmail(payload.email)

    if(existingUser){
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST)
    }

    payload.password = hashedPassword

    const newUser = await this.userService.createUser(payload)

    return {
      status: "success",
      status_code: 201,
      message: "User created successfully",
      data: newUser
    }
  }

  async signIn(payload: SignInInterface) {
    const email = payload.email;

    const user = await this.userService.findUserByEmail(email)

    if(user.password != payload.password) {
      throw new HttpException("Password is not valid", HttpStatus.UNAUTHORIZED)
    }

    const { password, ...result } = user;
    // generate jwt token
    return {
      status: "success",
      status_code: 200,
      message: "Sign-in sucess",
      data: []
    }
  }

  async validateUser(payload: SignInInterface) {
    const user = await this.userService.findUserByEmail(payload.email);

    if(!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password)

    if(!isPasswordValid) {
      return null 
    }

    const { password, ...result } = user 
    return result
  }
}
