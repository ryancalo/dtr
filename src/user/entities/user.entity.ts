import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../enums/user-type.enum';
import * as argon2 from 'argon2';
import { Profile } from '@dtr/profile/entities/profile.entity';
import { Employee } from '@dtr/employee/entities';

@Entity('user')
@Unique(['username', 'profileId'])
export class User {
  @PrimaryColumn({ unique: true })
  id?: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserType })
  usertype: UserType;

  @Column({ type: 'uuid' })
  profileId: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  profile: Profile;

  @Column({ type: 'uuid' })
  employeeId: string;

  @OneToOne(() => Employee, (employee) => employee.user, {
    cascade: true,
  })
  employee: Employee;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;

  @BeforeInsert()
  async hashPasswordOnInsert?() {
    this.password = await argon2.hash(this.password);
  }

  @BeforeUpdate()
  async hashPasswordOnUpdate?() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
}
