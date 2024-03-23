import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from 'src/entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, ])
  ],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
