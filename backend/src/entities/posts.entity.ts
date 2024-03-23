import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";

import { User } from "./user.entity";
import { Community } from "./community.entity";
import { PostLikes } from "./post_likes.entity";
import { PostComment } from "./post_comments.entity";

@Entity({ name: "posts"})
export class Post {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public user_id: string

  @Column({
    nullable: true
  })
  public community_id: string

  @Column('text')
  public content: string

  @Column({ default: 0})
  public likes: number

  @Column({ default: 0})
  public comments: number

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id"})
  user: User

  @ManyToOne(() => Community, (community) => community.posts)
  @JoinColumn({ name: "community_id"})
  community: Community

  @OneToMany(() => PostLikes, (postLikes) => postLikes.post)
  post_likes: PostLikes[]

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  post_comments: PostComment[]
}