import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { Community } from 'src/entities/community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community, ])
  ],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
