import { IsEnum, IsOptional } from 'class-validator';
import { Department, EmployeeStatus } from '../enums';
import { BaseQueryOptionsDto } from '@dtr/common/dtos';

export class GetAllEmployeesRequestDto extends BaseQueryOptionsDto {
  @IsOptional()
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  department: Department;
}
