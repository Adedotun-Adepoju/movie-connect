import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';
import { Community } from 'src/entities/community.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(Community)
    private communityRepo: Repository<Community>,

    private userService: UserService,
  ){}

  async createPost(userId: string, communityId: string, content: string) {
    const existingCommunity = await this.communityRepo.findOne({
      where: {
        id: communityId
      }
    });

    if (!existingCommunity) {
      throw new HttpException("Community Id is not valid", HttpStatus.BAD_REQUEST);
    }

    const newPost = this.postRepo.create({
      user_id: userId,
      community_id: communityId,
      content: content
    });

    await this.postRepo.save(newPost);

    return {
      status: "success",
      status_code: 201,
      message: "Post created successfully",
      data: newPost
    }
  }

  async fetchPostById(postId: string) {
    const post = await this.postRepo.findOne({
      where: {
        id: postId
      }
    })

    return {
      status: "success",
      status_code: 200,
      message: "Post fetched successfully",
      data: post
    }
  }

  async fetchAllPosts(){
    const posts = await this.postRepo.find({
      order: {
        created_at: "DESC"
      }
    });

    return {
      status: "success",
      status_code: 200,
      message: "Posts fetched successfully",
      data: posts
    }
  }

  async fetchPostsByUser(userId: string) {
    const existingUser = await this.userService.findUserById(userId);

    if (!existingUser) {
      throw new HttpException("User Id is not valid", HttpStatus.BAD_REQUEST);
    }

    const existingPosts = await this.postRepo.find({
      where: {
        user_id: userId
      },
      order: {
        created_at: "DESC"
      }
    })

    return {
      status: "success",
      status_code: 200,
      message: "Posts retrieved successfully",
      data: existingPosts
    }
  }

  async fetchPostsByCommunity(communityId: string) {
    const existingCommunity = await this.communityRepo.findOne({
      where: {
        id: communityId
      }
    });

    if (!existingCommunity) {
      throw new HttpException("Community Id is not valid", HttpStatus.BAD_REQUEST);
    }

    const existingPosts = await this.postRepo.find({
      where: {
        community_id: communityId
      },
      order: {
        created_at: "DESC"
      }
    })

    return {
      status: "success",
      status_code: 200,
      message: "Posts retrieved successfully",
      data: existingPosts
    }
  }
}
