import { EmployeeStore } from './employee.store';
import { GetAllEmployeesRequestDto, UpdateEmployeeRequestDto } from './dtos';
import { Injectable } from '@nestjs/common';
import { Employee } from './entities';

@Injectable()
export class EmployeeService {
  constructor(private readonly empStore: EmployeeStore) {}

  async getOne(employeeId: string): Promise<Employee> {
    return this.empStore.getOne(employeeId);
  }

  async getAll(dto: GetAllEmployeesRequestDto): Promise<Employee[]> {
    return this.empStore.getAll(dto);
  }

  async update(
    employeeId: string,
    dto: UpdateEmployeeRequestDto,
  ): Promise<Employee> {
    const updatedEmployee = dto.toEntity();
    return this.empStore.update(employeeId, updatedEmployee);
  }
}
