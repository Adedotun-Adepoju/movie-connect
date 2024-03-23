import { IsString, IsEmail, IsNotEmpty, isString, isNotEmpty, IsOptional } from "class-validator";

export class CreatePostDto {
  @IsOptional()
  @IsString()
  community_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
