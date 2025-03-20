import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities';
import { Profile } from './profile/entities';
import { UserMOdule } from './user/user.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { DTOValidator } from './common/validators';
import { TransformRequestDataPipe } from './common/pipes';
import { Schedule } from './schedule/entities';
import { ScheduleModule } from './schedule/schedule.module';
import { Employee, EmployeeSchedule } from './employee/entities';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: 'postgres://postgres:postgres@127.0.0.1:5432/postgres?sslmode=disable',
        poolSize: configService.get<number>('SQL_POOL_SIZE'),
        synchronize: true,
        entities: [User, Profile, Schedule, Employee, EmployeeSchedule],
      }),
    }),
    UserMOdule,
    ScheduleModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DTOValidator,
    },
    {
      provide: APP_PIPE,
      useValue: TransformRequestDataPipe,
    },
  ],
})
export class AppModule {}
