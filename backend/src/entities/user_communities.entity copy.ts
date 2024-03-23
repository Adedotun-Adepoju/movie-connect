import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";

import { User } from "./user.entity";
import { Community } from "./community.entity";

@Entity({ name: "user_communities"})
export class UserCommunity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public user_id: string

  @Column()
  public community_id: string

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

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id"})
  user: User

  @OneToOne(() => Community)
  @JoinColumn({ name: "community_id"})
  community: Community
}