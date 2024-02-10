import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
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
}
