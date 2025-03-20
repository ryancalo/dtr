import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dtos';
import { User } from './entities';
import { ValidateDTO } from '@dtr/common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ValidateDTO(CreateUserRequestDto, 'body')
  create(@Body() dto: CreateUserRequestDto): Promise<User> {
    return this.userService.create(dto);
  }
}
