import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/post.dto';
import { ResponseHelper, ResponseInterface } from 'src/helper/response.helper';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService
  ){}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    try {
      const { user_id, community_id, content } = createPostDto
      const res: ResponseInterface = await this.postService.createPost(user_id, community_id, content);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }
}
