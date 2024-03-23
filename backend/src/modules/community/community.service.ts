import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from 'src/entities/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityInterface } from './interfaces/community.interfaces';
import { ResponseInterface } from 'src/helper/response.helper';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private communityRepo: Repository<Community>
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
}
