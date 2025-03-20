import { IsNotEmpty, Matches } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { Schedule } from '../entities';

export class CreateSceduleRequestDto {
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @IsNotEmpty({ message: 'login is required.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  login: string;

  @IsNotEmpty({ message: 'lunch_out is required.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  lunch_out: string;

  @IsNotEmpty({ message: 'lunch_in is required.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  lunch_in: string;

  @IsNotEmpty({ message: 'logout is required.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  logout: string;

  toEntity?(): Schedule {
    const newSchedule = new Schedule();
    newSchedule.id = uuid();
    newSchedule.name = this.name;
    newSchedule.login = this.login;
    newSchedule.lunchOut = this.lunch_out;
    newSchedule.lunchIn = this.lunch_in;
    newSchedule.logout = this.logout;

    return newSchedule;
  }
}
