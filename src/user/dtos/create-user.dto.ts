import { IsEnum, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { User } from '../entities';
import { UserType } from '../enums/user-type.enum';
import { Type } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { CreateProfileRequestDto } from '@dtr/profile/dtos';
import { CreateEmployeeRequestDto } from '@dtr/employee/dtos';

export class CreateUserRequestDto {
  @IsNotEmpty({ message: 'username is required.' })
  username: string;

  @IsNotEmpty({ message: 'password is required.' })
  password: string;

  @IsNotEmpty({ message: 'user_type is required.' })
  @IsEnum(UserType)
  user_type: UserType;

  @IsNotEmpty({ message: 'profile is required.' })
  @ValidateNested()
  @IsObject()
  @Type(() => CreateProfileRequestDto)
  profile: CreateProfileRequestDto;

  @IsNotEmpty({ message: 'employee is required.' })
  @ValidateNested()
  @IsObject()
  @Type(() => CreateEmployeeRequestDto)
  employee: CreateEmployeeRequestDto;

  toEntity?(): User {
    const newUser = new User();
    const newUserId = uuid();

    const profile = this.profile.toEntity();
    profile.userId = newUserId;

    const employee = this.employee.toEntity();
    employee.userId = newUserId;

    newUser.profile = profile;
    newUser.profileId = profile.id;

    newUser.employee = employee;
    newUser.employeeId = employee.id;

    newUser.id = newUserId;
    newUser.username = this.username;
    newUser.password = this.password;
    newUser.usertype = this.user_type;

    return newUser;
  }
}
