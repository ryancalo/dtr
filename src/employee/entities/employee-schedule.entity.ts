import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Schedule } from '@dtr/schedule/entities';

@Entity('employee_schedule')
@Unique(['employeeId'])
export class EmployeeSchedule {
  @PrimaryColumn({ unique: true })
  id?: string;

  @Column()
  employeeId: string;

  @ManyToOne(() => Employee, (employee) => employee)
  employee: Employee;

  @Column({ nullable: true, type: 'uuid' })
  monId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  mon: Schedule;

  @Column({ nullable: true, type: 'uuid' })
  tueId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  tue: Schedule;

  @Column({ nullable: true, type: 'uuid' })
  wedId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  wed: Schedule;

  @Column({ nullable: true, type: 'uuid' })
  thuId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  thu: Schedule;

  @Column({ nullable: true, type: 'uuid' })
  friId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  fri: Schedule;

  @Column({ nullable: true, type: 'uuid' })
  satId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  sat: Schedule;

  @Column({ nullable: true, type: 'uuid' })
  sunId: string;

  @OneToOne(() => Schedule, (schedule) => schedule, { eager: true })
  @JoinColumn()
  sun: Schedule;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
