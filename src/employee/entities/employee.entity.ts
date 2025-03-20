import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Department, EmployeeStatus } from '../enums';
import { User } from '@dtr/user/entities';
import { EmployeeSchedule } from './employee-schedule.entity';

@Entity('employee')
@Unique(['userId', 'employeeCustomId'])
export class Employee {
  @PrimaryColumn({ unique: true })
  id?: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => User, (user) => user.employee, { lazy: true })
  user?: User;

  @Column()
  employeeCustomId: string;

  @Column({ nullable: true, type: 'uuid' })
  employeeScheduleId?: string;

  @OneToOne(() => EmployeeSchedule, (schedule) => schedule.employee, {
    eager: true,
  })
  employeeSchedule?: EmployeeSchedule;

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
  })
  status: EmployeeStatus;

  @Column({ type: 'enum', enum: Department })
  department: Department;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
