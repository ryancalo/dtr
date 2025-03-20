import { IsEnum, IsNotEmpty } from 'class-validator';

import { v4 as uuid } from 'uuid';
import { Employee } from '../entities';
import { Department, EmployeeStatus } from '../enums';

export class CreateEmployeeRequestDto {
  @IsNotEmpty({ message: 'employeeId is required.' })
  employeeId: string;

  @IsNotEmpty({ message: 'department is required.' })
  @IsEnum(Department)
  department: Department;

  @IsNotEmpty({ message: 'status is required.' })
  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;

  toEntity?(): Employee {
    const newEmployee = new Employee();
    newEmployee.id = uuid();
    newEmployee.employeeCustomId = this.employeeId;
    newEmployee.department = this.department;
    newEmployee.status = this.status;

    return newEmployee;
  }
}
