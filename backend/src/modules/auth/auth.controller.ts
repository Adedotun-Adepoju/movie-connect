import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService
  ){}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto){
    await this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto){
    console.log({ signInDto })
  }
}
