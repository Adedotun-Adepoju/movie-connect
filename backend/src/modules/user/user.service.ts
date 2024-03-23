import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ){}

  async createUser(data: CreateUserInterface): Promise<Partial<User>>{
    const user = this.userRepo.create(data)
    await this.userRepo.save(user)

    const {password, ...result } = user 

    return result
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        email: email
      }
    });

    return user
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        id: id
      }
    });

    return user  
  }
}
