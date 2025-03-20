import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeSchedule } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeScheduleStore {
  constructor(
    @InjectRepository(EmployeeSchedule)
    private empSchedRepo: Repository<EmployeeSchedule>,
  ) {}

  async create(employeeSchedule: EmployeeSchedule): Promise<EmployeeSchedule> {
    const manager = this.empSchedRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      return transactionalEntityManager.save(employeeSchedule);
    });
  }

  async getOne(employeeId: string): Promise<EmployeeSchedule> {
    return this.empSchedRepo.findOneByOrFail({ employeeId });
  }

  async update(employeeSchedule: EmployeeSchedule): Promise<EmployeeSchedule> {
    const manager = this.empSchedRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      const currentSched = await transactionalEntityManager.findOneOrFail(
        EmployeeSchedule,
        {
          where: { employeeId: employeeSchedule.employeeId },
          loadEagerRelations: false,
        },
      );

      Object.assign(currentSched, employeeSchedule);

      return transactionalEntityManager.save(currentSched);
    });
  }
}
