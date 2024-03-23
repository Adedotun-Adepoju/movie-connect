import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from 'src/entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Community } from 'src/entities/community.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Community]),
    UserModule,
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
