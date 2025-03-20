import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities';
import { Injectable } from '@nestjs/common';
import { GetAllEmployeesRequestDto } from './dtos';

@Injectable()
export class EmployeeStore {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
  ) {}

  async getOne(employeeId: string): Promise<Employee> {
    return this.employeeRepo.findOneByOrFail({ id: employeeId });
  }

  async getAll(dto: GetAllEmployeesRequestDto): Promise<Employee[]> {
    return this.employeeRepo.find({ withDeleted: true });
  }

  async update(
    employeeId: string,
    updatedEmployee: Employee,
  ): Promise<Employee> {
    const manager = this.employeeRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      const currentEmployee = await transactionalEntityManager.findOneOrFail(
        Employee,
        { where: { id: employeeId }, loadEagerRelations: false },
      );

      Object.assign(currentEmployee, updatedEmployee);

      return transactionalEntityManager.save(currentEmployee);
    });
  }
}
