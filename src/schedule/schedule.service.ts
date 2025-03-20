import { Injectable } from '@nestjs/common';
import { ScheduleStore } from './schedule.store';
import { Schedule } from './entities';
import { CreateSceduleRequestDto } from './dtos';

@Injectable()
export class ScheduleService {
  constructor(private readonly userStore: ScheduleStore) {}

  async create(dto: CreateSceduleRequestDto): Promise<Schedule> {
    const newSchedule = dto.toEntity();
    return this.userStore.create(newSchedule);
  }
}
