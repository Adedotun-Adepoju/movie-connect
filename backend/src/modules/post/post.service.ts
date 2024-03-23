import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/posts.entity';
import { Like, Repository } from 'typeorm';
import { Community } from 'src/entities/community.entity';
import { UserService } from '../user/user.service';
import { PostLikes } from 'src/entities/post_likes.entity';
import { PostComment } from 'src/entities/post_comments.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(Community)
    private communityRepo: Repository<Community>,

    @InjectRepository(PostLikes)
    private postLikesRepo: Repository<PostLikes>,

    @InjectRepository(PostComment)
    private postCommentRepo: Repository<PostComment>,

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

  async likePost(userId: string, postId: string) {
    const existingPostLike = await this.postLikesRepo.findOne({
      where: {
        post_id: postId,
        user_id: userId
      }
    })

    if (existingPostLike && existingPostLike.is_active) {
    }else if (existingPostLike && !existingPostLike.is_active) {
      await this.postLikesRepo.update(
        { 
          id: existingPostLike.id
        },
        {
          is_active: true
        }
      )
    }else if (!existingPostLike) {
      const postLike = this.postLikesRepo.create({
        user_id: userId,
        post_id: postId
      })

      await this.postLikesRepo.save(postLike)
    }

    const [ _, count ] = await this.postLikesRepo.findAndCount({
      where: {
        post_id: postId,
        is_active: true
      }
    });

    await this.postRepo.update(
      { id: postId },
      { likes: count }
    )

    const posts = await this.postRepo.findOne({
      where: {
        id: postId
      }
    })

    return {
      status: "success",
      status_code: 201,
      message: "Like added",
      data: posts
    }
  }

  async addComment(postId: string, payload) {
    const newComment = this.postCommentRepo.create({
      post_id: postId,
      user_id: payload.user_id,
      content: payload.content
    })

    await this.postCommentRepo.save(newComment)

    const [ _, count ] = await this.postCommentRepo.findAndCount({
      where: {
        post_id: postId,
      }
    });

    await this.postRepo.update(
      { id: postId },
      { comments: count }
    )

    return {
      status: "success",
      status_code: 201,
      message: "Comment added",
      data: newComment
    }
  }

  async fetchPostComments(postId) {
    const comments = await this.postCommentRepo.find({
      where: {
        post_id: postId
      }
    })

    return {
      status: "success",
      status_code: 201,
      message: "Comments fetched",
      data: comments
    }
  }
}
