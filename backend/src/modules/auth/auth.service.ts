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
import { MailService } from '../mail/mail.service';
import { EmailVerification } from 'src/entities/email_verification.entity';
import * as uuid from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,

    @InjectRepository(PasswordReset)
    private passwordResetRepo:Repository<PasswordReset>,

    @InjectRepository(User)
    private userRepo:Repository<User>,

    @InjectRepository(EmailVerification)
    private emailVerificationRepo:Repository<EmailVerification>,
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

  async sendPasswordResetLink(email: string) {
    // Check if mail exists
    const user = await this.userRepo.findOne({
      where: {
        email: email
      }
    })

    if(!user){
      throw new HttpException(
        "Email does not exist",
        HttpStatus.NOT_FOUND
      )
    }

    // check if there is an existing password reset
    const passwordReset = await this.passwordResetRepo.findOne({
      where: {
        email: email,
        is_deleted: false
      }
    })

    if (passwordReset){
      passwordReset.is_deleted = true 
      await this.passwordResetRepo.save(passwordReset)
    }

    const token = uuid.v4();

    // Create new record for password reset
    const newReset = this.passwordResetRepo.create({
      email, 
      token
    })

    await this.passwordResetRepo.save(newReset)

    // Send mail
    const mailPayload = {
      recipient: email,
      subject: "Password Reset",
      template: "password-reset",
      data: {
        name: `${user.first_name} ${user.last_name}`,
        url: `${process.env.FRONTEND_WEB_URL}/auth/password-reset/${token}`
      }
    }

    await this.mailService.sendMail(mailPayload)
    return {
      status: "success",
      statusCode: 200,
      message: "Password reset email sent successfully",
      data: []
    }
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
  
  async verifyEmail (emailId: string) {
    const verification = await this.emailVerificationRepo.findOne({
      where: { id: emailId }
    });
    if (!verification) throw new HttpException({message: 'Email verification does not exist'}, 404)
    await this.emailVerificationRepo.update(
      { id: emailId },
      { status: 'verified' },
    );
    return {
      statusCode: 200,
      status: 'success',
      message: 'Email verified successfully',
      data: verification,
    } 
  }

  async checkEmailVerification (email: string) {
    const verification = await this.emailVerificationRepo.findOne({
      where: { email }
    });
    if (verification && verification.status !== "verified") {
      throw new HttpException({message: 'Email not verified'}, 400)
    }
    return {
      status: "success",
      message: "Email Verified Successfully",
      statusCode: 200,
      data: {},
    }
  }


  async resendVerificationLink (email: string) {
    const verification = await this.emailVerificationRepo.findOne({
      where: { email }
    });
    if (!verification) {
      throw new HttpException({message: 'Email verification not found'}, 404)
    }
    const user = await this.userRepo.findOneBy({
      id: verification.user_id,
    });
    const organization = await this.organizationRepo.findOne({
      where: {
        id: user.organization_id,
      },
    });
    await this.sendEmailVerification(verification.email, organization.organization_name, verification.id)
    return {
      status: "success",
      message: "Email link has been sent successfully",
      statusCode: 200,
      data: {},
    }
  }

  async sendEmailVerification (email: string, organization_name: string, email_id: string) {
    const mailPayload = {
      receipient: email,
      subject: "Email verification",
      template: "email-verification",
      data: {
        name: organization_name,
        url: `${process.env.WEB_URL}/auth?email_id=${email_id}`,
      }
    }
    await this.mailService.sendMail(mailPayload)
  }
}
