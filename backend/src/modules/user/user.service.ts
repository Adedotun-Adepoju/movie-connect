import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ){}

  async createUser(){

  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        email: email
      }
    });

    return user
  }

  async findUserById() {
    
  }
}
