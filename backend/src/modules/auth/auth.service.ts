import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInInterface, SignUpInterface } from './interfaces/auth.interface';
import { ResponseInterface } from 'src/helper/response.helper';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
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

  async signIn(user: any): Promise<ResponseInterface> {
    const payload = {
      username: user.email,
      sub: user.id
    }

    const data = {
      user,
      access_token: this.jwtService.sign(payload)
    }

    return {
      message: "Sign in successful",
      status: "success",
      status_code: 200,
      data
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
