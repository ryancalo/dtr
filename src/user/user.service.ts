import { UserStore } from './user.store';
import { User } from './entities';
import { CreateUserRequestDto } from './dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userStore: UserStore) {}

  async create(dto: CreateUserRequestDto): Promise<User> {
    const newUser = dto.toEntity();
    return this.userStore.create(newUser);
  }
}
