import { AttendanceStore } from './attendance.store';
import { Attendance } from './entities';

export class AttendanceService {
  constructor(private attendanceStore: AttendanceStore) {}

  async create(newAttendance: Attendance): Promise<Attendance> {
    return this.attendanceStore.create(newAttendance);
  }
}
