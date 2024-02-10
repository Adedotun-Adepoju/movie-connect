import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { ResponseHelper, ResponseInterface } from 'src/helper/response.helper';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
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
  async signIn(@Body() signInDto: SignInDto){
    try {
      const res: ResponseInterface = await this.authService.signIn(signInDto)
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
