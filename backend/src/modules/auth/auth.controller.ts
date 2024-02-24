import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { ResponseHelper, ResponseInterface } from 'src/helper/response.helper';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService
  ){}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto){
    try {
      const res: ResponseInterface = await this.authService.signUp(signUpDto)
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req){
    try {
      const res: ResponseInterface = await this.authService.signIn(req.user)
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/forgot-password')
  async sendPasswordResetLink(@Body() payload: ForgotPasswordDto) {
    try {
      const { statusCode, status, message, data } = await this.authService.sendPasswordResetLink(payload.email);
      return ResponseHelper.successResponse(message, statusCode, data)
    } catch(error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('/password/reset')
  async resetPassword(@Body() payload: ResetPasswordDto) {
    try {
      const { statusCode, status, message, data } = await this.authService.resetPassword(payload.token, payload.new_password);
      return ResponseHelper.successResponse(message, statusCode, data)
    } catch(error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get('/verify-email/:email_verification_id')
  async verifyEmail(@Param('email_verification_id') emailVerificationId: string) {
    try {
      const { statusCode, message, data, status } = await this.authService.verifyEmail(emailVerificationId);
      return ResponseHelper.successResponse(message, statusCode, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/resend-email-verification-link')
  async resendVerificationLink (@Body() resendVerificationLinkDto ) {
    try {
      const { email } = resendVerificationLinkDto;
      const { statusCode, message, data } =
        await this.authService.resendVerificationLink(email);
      return ResponseHelper.successResponse(message, statusCode, data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/check_email_verification/:email')
  async checkEmailVerification (@Param('email') email: string ) {
    try {
      const { statusCode, message, data } =
        await this.authService.checkEmailVerification(email);
        return ResponseHelper.successResponse(message, statusCode, data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
