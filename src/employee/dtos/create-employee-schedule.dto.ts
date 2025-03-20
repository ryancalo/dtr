import { IsString, ValidateIf } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { EmployeeSchedule } from '../entities';

export class CreateEmployeeScheduleRequestDto {
  @ValidateIf((o) => o.mon !== null)
  @IsString()
  mon: string | null;

  @ValidateIf((o) => o.tue !== null)
  @IsString()
  tue: string | null;

  @ValidateIf((o) => o.wed !== null)
  @IsString()
  wed: string | null;

  @ValidateIf((o) => o.thu !== null)
  @IsString()
  thu: string | null;

  @ValidateIf((o) => o.fri !== null)
  @IsString()
  fri: string | null;

  @ValidateIf((o) => o.sat !== null)
  @IsString()
  sat: string | null;

  @ValidateIf((o) => o.sun !== null)
  @IsString()
  sun: string | null;

  toEntity?(): EmployeeSchedule {
    const newEmployeeSched = new EmployeeSchedule();
    newEmployeeSched.id = uuid();
    newEmployeeSched.monId = this.mon;
    newEmployeeSched.tueId = this.tue;
    newEmployeeSched.wedId = this.wed;
    newEmployeeSched.thuId = this.thu;
    newEmployeeSched.friId = this.fri;
    newEmployeeSched.satId = this.sat;
    newEmployeeSched.sunId = this.sun;

    return newEmployeeSched;
  }
}
