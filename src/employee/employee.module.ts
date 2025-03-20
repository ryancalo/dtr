import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeStore } from './employee.store';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee, EmployeeSchedule } from './entities';
import { EmployeeScheduleStore } from './employee-schedule.store';
import { EmployeeScheduleService } from './employee-schedule.service';
import { EmployeeSchduleController } from './employee-schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, EmployeeSchedule])],
  controllers: [EmployeeController, EmployeeSchduleController],
  providers: [
    EmployeeStore,
    EmployeeService,
    EmployeeScheduleStore,
    EmployeeScheduleService,
  ],
})
export class EmployeeModule {}
