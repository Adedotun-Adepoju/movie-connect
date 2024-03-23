import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CommunityService } from './community.service';
import { AddUserToCommunityDto, CreateCommunityDto } from './dto/community.dto';
import { ResponseHelper, ResponseInterface } from 'src/helper/response.helper';

@Controller('community')
export class CommunityController {
  constructor(
    private communityService: CommunityService
  ){}

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
}
