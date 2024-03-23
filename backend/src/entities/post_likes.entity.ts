import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";

import { Post } from "./posts.entity";
import { User } from "./user.entity";

@Entity({ name: "post_likes"})
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public post_id: string

  @Column()
  public user_id: string

  @Column('text')
  public content: string

  @Column()
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

  @OneToOne(() => Post)
  @JoinColumn({ name: "post_id"})
  post: Post

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id"})
  user: User
}