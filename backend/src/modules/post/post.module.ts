import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from 'src/entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Community } from 'src/entities/community.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Community])
  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController]
})
export class PostModule {}
