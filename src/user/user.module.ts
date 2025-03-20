import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserStore } from './user.store';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserStore, UserService],
})
export class UserMOdule {}
