import { IsString, IsEmail, IsNotEmpty, isString, isNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsString()
  community_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
