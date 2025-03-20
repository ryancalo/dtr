import { IsString, ValidateIf } from 'class-validator';
import { EmployeeSchedule } from '../entities';

export class UpdateEmployeeScheduleRequestDto {
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
    const updatedEmployeeSched = new EmployeeSchedule();
    updatedEmployeeSched.monId = this.mon;
    updatedEmployeeSched.tueId = this.tue;
    updatedEmployeeSched.wedId = this.wed;
    updatedEmployeeSched.thuId = this.thu;
    updatedEmployeeSched.friId = this.fri;
    updatedEmployeeSched.satId = this.sat;
    updatedEmployeeSched.sunId = this.sun;

    return updatedEmployeeSched;
  }
}
