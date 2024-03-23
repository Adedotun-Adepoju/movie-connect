import { 
  Entity, 
  Column, 
  Unique,
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { EmailVerification } from "./email_verification.entity";
import { UserCommunity } from "./user_communities.entity";
import { Post } from "./posts.entity";
import { PostLikes } from "./post_likes.entity";

@Entity({ name: "users"})
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public first_name: string

  @Column()
  public last_name: string

  @Column()
  public email: string 

  @Column({
    type: "text"
  })
  public password: string

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

  @OneToOne(() => EmailVerification, (emailVerification) => emailVerification.user)
  emailVerification: EmailVerification

  @OneToMany(() => UserCommunity, (userCommunity) => userCommunity.user)
  user_communities: UserCommunity[]

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => PostLikes, (postLikes) => postLikes.user)
  post_likes: PostLikes[]
}