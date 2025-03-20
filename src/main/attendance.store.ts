import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities';

export class AttendanceStore {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  async create(newAttendance: Attendance): Promise<Attendance> {
    const manager = this.attendanceRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      return transactionalEntityManager.save(newAttendance);
    });
  }
}
