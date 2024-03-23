import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('')
  async fetchAllPosts() {
    try {
      const res: ResponseInterface = await this.postService.fetchAllPosts();
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async fetchPostsById(@Param('id') userId: string) {
    try {
      const res: ResponseInterface = await this.postService.fetchPostById(userId);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('community/:community_id')
  async fetchPostsByCommunity(@Param('community_id') communityId: string) {
    try {
      const res: ResponseInterface = await this.postService.fetchPostsByCommunity(communityId);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:user_id/')
  async fetchPostsByUser(@Param('user_id') userId: string) {
    try {
      const res: ResponseInterface = await this.postService.fetchPostsByUser(userId);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }
}
