import { User } from '@dtr/user/entities';
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
import { GenderType } from '../enums/gender.enum';

@Entity('profile')
@Unique(['userId'])
export class Profile {
  @PrimaryColumn({ unique: true })
  id?: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => User, (user) => user.profile, { lazy: true })
  user?: User;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  middlename?: string;

  @Column()
  lastname: string;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column({ type: 'date' })
  birthdate: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}
