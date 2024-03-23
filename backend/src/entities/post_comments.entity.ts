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

@Entity({ name: "post_comments"})
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public post_id: string

  @Column()
  public user_id: string

  @Column('text')
  public content: string

  @Column({ default: 0 })
  public likes: number

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

  @ManyToOne(() => User, (user) => user.post_comments)
  @JoinColumn({ name: "user_id"})
  user: User

  @ManyToOne(() => Post, (post) => post.post_comments)
  @JoinColumn({ name: "post_id"})
  post: Post
}