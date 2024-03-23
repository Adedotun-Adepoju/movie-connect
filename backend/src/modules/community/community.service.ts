import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from 'src/entities/community.entity';
import { UserCommunity } from 'src/entities/user_communities.entity';
import { Repository } from 'typeorm';
import { CreateCommunityInterface } from './interfaces/community.interfaces';
import { ResponseInterface } from 'src/helper/response.helper';
import { UserService } from '../user/user.service';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private communityRepo: Repository<Community>,

    @InjectRepository(UserCommunity)
    private userCommunityRepo: Repository<UserCommunity>,

    private userService: UserService
  ){}

  async createCommunity(createCommunityInterface: CreateCommunityInterface): Promise<ResponseInterface> {
    const newCommunity = this.communityRepo.create({
      name: createCommunityInterface.name
    })

    await this.communityRepo.save(newCommunity)

    return {
      status: "success",
      status_code: 201, 
      message: "Community created successfully",
      data: newCommunity
    }
  }

  async fetchAllCommunities(): Promise<ResponseInterface> {
    const communities = await this.communityRepo.find()

    return {
      status: "success",
      status_code: 200,
      message: "Communities fetched successfully",
      data: communities
    }
  }

  async fetchCommunityById(communityId: string): Promise<ResponseInterface> {
    const community = await this.communityRepo.findOne({
      where: {
        id: communityId
      }
    })

    if (!community) {
      throw new HttpException("No Community with the specified Id", HttpStatus.NOT_FOUND)
    }

    return {
      status: "success",
      status_code: 200,
      message: "Community fetched successfully",
      data: community
    }
  }

  async AddUserToCommunity(communityId: string, userId: string): Promise<ResponseInterface> {
    const existingUser = await this.userService.findUserById(userId)

    if(!existingUser) {
      throw new HttpException("User Id is not valid", HttpStatus.BAD_REQUEST)
    }

    const existingCommunity = await this.communityRepo.findOne({
      where: {
        id: communityId
      }
    })

    if(!existingCommunity) {
      throw new HttpException("Community Id is not valid", HttpStatus.BAD_REQUEST)
    }

    // Check if user belongs to community
    const existingUserCommunity = await this.userCommunityRepo.findOne({
      where: {
        user_id: userId,
        community_id: communityId
      }
    })

    if (existingUserCommunity && existingUserCommunity.is_active){
      throw new HttpException("User already belongs to this community", HttpStatus.BAD_REQUEST);
    }

    if (existingUserCommunity && !existingUserCommunity.is_active) {
      await this.userCommunityRepo.update(
        { 
          user_id: userId,
          community_id: communityId
        }, 
        {
          is_active: true
        }
      )
    } else {
      const newUserCommunity = this.userCommunityRepo.create({
        community_id: communityId,
        user_id: userId
      });
  
      await this.userCommunityRepo.save(newUserCommunity)
    }

    const userCommunity = await this.userCommunityRepo.findOne({
      where: {
        user_id: userId,
        community_id: communityId
      }
    })


    return {
      status: "success",
      status_code: 201,
      message: "User has been added to Community",
      data: userCommunity
    }
  }

  async deactiveUserFromCommunity(communityId: string, userId: string): Promise<ResponseInterface> {
    await this.userCommunityRepo.update(
      {
        user_id: userId,
        community_id: communityId
      },
      {
        is_active: false
      }
    )

    return {
      status: "sucess",
      message: "User has been removed from the community",
      status_code: 204,
      data: []
    }
  }

  async fetchUserCommunities(userId: string): Promise<ResponseInterface> {
    const communities = await this.userCommunityRepo.find({
      where: {
        user_id: userId,
        is_active: true
      },
      relations: ["community"]
    })
    
    return {
      status: "success",
      status_code: 200,
      message: "Community fetched successfully",
      data: communities
    }
  }
}
