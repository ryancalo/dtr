import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Profile } from '../entities/profile.entity';
import { GenderType } from '../enums/gender.enum';
import { Type } from 'class-transformer';
import { v4 as uuid } from 'uuid';

export class CreateProfileRequestDto {
  @IsNotEmpty({ message: 'first_name is required.' })
  first_name: string;

  @IsOptional()
  middle_name: string;

  @IsNotEmpty({ message: 'last_name is required.' })
  last_name: string;

  @IsNotEmpty({ message: 'gender is required.' })
  @IsEnum(GenderType)
  gender: GenderType;

  @IsNotEmpty({ message: 'birthdate is required.' })
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  toEntity?(): Profile {
    const newProfile = new Profile();
    newProfile.id = uuid();
    newProfile.firstname = this.first_name;
    newProfile.middlename = this.middle_name;
    newProfile.lastname = this.last_name;
    newProfile.gender = this.gender;
    newProfile.birthdate = this.birthdate;

    return newProfile;
  }
}
