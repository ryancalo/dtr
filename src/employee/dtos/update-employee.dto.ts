import { IsEnum, IsOptional } from 'class-validator';
import { Employee } from '../entities';
import { Department, EmployeeStatus } from '../enums';

export class UpdateEmployeeRequestDto {
  @IsOptional()
  @IsEnum(Department)
  department: Department;

  @IsOptional()
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  toEntity?(): Employee {
    const newEmployee = new Employee();
    newEmployee.department = this.department;
    newEmployee.status = this.status;

    return newEmployee;
  }
}
