import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedule')
export class Schedule {
  @PrimaryColumn({ unique: true })
  id?: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  lunchOut: string;

  @Column()
  lunchIn: string;

  @Column()
  logout: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
