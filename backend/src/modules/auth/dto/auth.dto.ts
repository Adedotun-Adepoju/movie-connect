import { IsString, IsEmail, IsNotEmpty, isString } from "class-validator";

export class SignUpDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}