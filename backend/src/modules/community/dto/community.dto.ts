import { IsString, IsEmail, IsNotEmpty, isString, isNotEmpty } from "class-validator";

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AddUserToCommunityDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
