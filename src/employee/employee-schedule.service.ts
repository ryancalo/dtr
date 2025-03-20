import { EmployeeScheduleStore } from './employee-schedule.store';
import {
  CreateEmployeeScheduleRequestDto,
  UpdateEmployeeScheduleRequestDto,
} from './dtos';
import { Injectable } from '@nestjs/common';
import { EmployeeSchedule } from './entities';

@Injectable()
export class EmployeeScheduleService {
  constructor(private readonly empSchedStore: EmployeeScheduleStore) {}

  async create(
    employeeId: string,
    dto: CreateEmployeeScheduleRequestDto,
  ): Promise<EmployeeSchedule> {
    const newEmployeeSched = dto.toEntity();
    newEmployeeSched.employeeId = employeeId;
    return this.empSchedStore.create(newEmployeeSched);
  }

  async getOne(employeeId: string): Promise<EmployeeSchedule> {
    return this.empSchedStore.getOne(employeeId);
  }

  async update(
    employeeId: string,
    dto: UpdateEmployeeScheduleRequestDto,
  ): Promise<EmployeeSchedule> {
    const updatedEmployeeSched = dto.toEntity();
    updatedEmployeeSched.employeeId = employeeId;
    await this.empSchedStore.update(updatedEmployeeSched);

    return this.getOne(employeeId);
  }
}
