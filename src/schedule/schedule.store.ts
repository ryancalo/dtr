import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleStore {
  constructor(
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
  ) {}

  async create(newSchedule: Schedule): Promise<Schedule> {
    const manager = this.scheduleRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      return transactionalEntityManager.save(newSchedule);
    });
  }
}
