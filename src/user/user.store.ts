import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserStore {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(newUser: User): Promise<User> {
    const manager = this.userRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      return transactionalEntityManager.save(newUser);
    });
  }
}
