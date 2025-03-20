import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { GetAllEmployeesRequestDto, UpdateEmployeeRequestDto } from './dtos';
import { ValidateDTO } from '@dtr/common/decorators';
import { Employee } from './entities';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly empService: EmployeeService) {}

  @Patch(':employeeId')
  @ValidateDTO(UpdateEmployeeRequestDto, 'body')
  update(
    @Param('employeeId') employeeId: string,
    @Body() dto: UpdateEmployeeRequestDto,
  ): Promise<Employee> {
    return this.empService.update(employeeId, dto);
  }

  @Get(':employeeId')
  getOne(@Param('employeeId') employeeId: string): Promise<Employee> {
    return this.empService.getOne(employeeId);
  }

  @Get()
  @ValidateDTO(GetAllEmployeesRequestDto, 'query')
  getAll(@Query() dto: GetAllEmployeesRequestDto): Promise<Employee[]> {
    return this.empService.getAll(dto);
  }
}
