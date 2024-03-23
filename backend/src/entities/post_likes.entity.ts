import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";

import { Post } from "./posts.entity";
import { User } from "./user.entity";

@Entity({ name: "post_likes"})
export class PostLikes {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public post_id: string

  @Column()
  public user_id: string

  @Column({
    type: "boolean",
    default: true,
  })
  public is_active: boolean

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

  @ManyToOne(() => User, (user) => user.post_likes)
  @JoinColumn({ name: "user_id"})
  user: User

  @ManyToOne(() => Post, (post) => post.post_likes)
  @JoinColumn({ name: "post_id"})
  post: Post
}