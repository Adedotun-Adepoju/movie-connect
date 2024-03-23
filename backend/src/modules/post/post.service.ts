import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>
  ){}

  async createPost(userId, communityId: string, content: string) {
    const newPost = this.postRepo.create({
      user_id: userId,
      community_id: communityId,
      content: content
    });

    await this.postRepo.save(newPost);

    return newPost;
  }
}
