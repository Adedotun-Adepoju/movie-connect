import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { AddUserToCommunityDto, CreateCommunityDto } from './dto/community.dto';
import { ResponseHelper, ResponseInterface } from 'src/helper/response.helper';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('community')
export class CommunityController {
  constructor(
    private communityService: CommunityService
  ){}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createCommunityDto: CreateCommunityDto) {
    try {
      const res: ResponseInterface = await this.communityService.createCommunity(createCommunityDto);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async fetchAllCommunities() {
    try {
      const res: ResponseInterface = await this.communityService.fetchAllCommunities();
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:community_id')
  async fetchCommunityById(@Param('community_id') communityId: string) {
    try {
      const res: ResponseInterface = await this.communityService.fetchCommunityById(communityId);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:community_id/add')
  async addUserToCommunity(
    @Param('community_id') communityId: string,
    @Body() payload: AddUserToCommunityDto
  ){
    try {
      const res: ResponseInterface = await this.communityService.AddUserToCommunity(communityId, payload.user_id);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:community_id/remove')
  async deactiveUserFromCommunity(
    @Param('community_id') communityId: string,
    @Body() payload
  ){
    try {
      const res: ResponseInterface = await this.communityService.deactiveUserFromCommunity(communityId, payload.user_id);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:user_id')
  async fetchUserCommunities(@Param('user_id') userId: string) {
    try {
      const res: ResponseInterface = await this.communityService.fetchUserCommunities(userId);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:user_id/status')
  async fetchAllCommunitiesWithUsersStatus(@Param('user_id') userId: string) {
    try {
      const res: ResponseInterface = await this.communityService.fetchAllCommunitiesWithUsersStatus(userId);
      return ResponseHelper.successResponse(res.message, res.status_code, res.data)
    } catch(error) {
      console.log(error)
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)   
    }
  }
}
