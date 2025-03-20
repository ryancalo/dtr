import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeScheduleService } from './employee-schedule.service';
import { ValidateDTO } from '@dtr/common/decorators';
import { EmployeeSchedule } from './entities';
import {
  CreateEmployeeScheduleRequestDto,
  UpdateEmployeeScheduleRequestDto,
} from './dtos';

@Controller('employees/:employeeId/schedule')
export class EmployeeSchduleController {
  constructor(private readonly empSchedService: EmployeeScheduleService) {}

  @Post()
  @ValidateDTO(CreateEmployeeScheduleRequestDto, 'body')
  Create(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateEmployeeScheduleRequestDto,
  ): Promise<EmployeeSchedule> {
    return this.empSchedService.create(employeeId, dto);
  }

  @Get()
  Get(@Param('employeeId') employeeId: string): Promise<EmployeeSchedule> {
    return this.empSchedService.getOne(employeeId);
  }

  @Put()
  Update(
    @Param('employeeId') employeeId: string,
    @Body() dto: UpdateEmployeeScheduleRequestDto,
  ): Promise<EmployeeSchedule> {
    return this.empSchedService.update(employeeId, dto);
  }
}
