import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInInterface, SignUpInterface } from './interfaces/auth.interface';
import { ResponseInterface } from 'src/helper/response.helper';
import { UserService } from '../user/user.service';
import { PasswordReset } from 'src/entities/password_reset.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @InjectRepository(PasswordReset)
    private passwordResetRepo:Repository<PasswordReset>,

    @InjectRepository(User)
    private userRepo:Repository<User>,
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

  async resetPassword(token: string, newPassword: string) {
    if(!newPassword || !token){
      throw new HttpException("Please provide new password and token", HttpStatus.FORBIDDEN)
    }
    
    const passwordReset = await this.passwordResetRepo.findOne({
      where: {
        token: token,
        is_deleted: false
      }
    })

    if(!passwordReset){
      throw new HttpException("Invalid token", HttpStatus.FORBIDDEN)
    }

    const user = await this.userService.findUserByEmail(passwordReset.email)

    user.password = await bcrypt.hash(newPassword, 10)
    await this.userRepo.save(user)
    passwordReset.is_deleted = true 
    await this.passwordResetRepo.save(passwordReset)

    return {
      status: "success",
      statusCode: 200,
      message: "Password reset successfully",
      data: []
    }
  } 
}
