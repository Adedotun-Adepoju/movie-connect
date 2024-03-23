import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { Community } from 'src/entities/community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserCommunity } from 'src/entities/user_communities.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community, UserCommunity]),
    UserModule,
  ],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
