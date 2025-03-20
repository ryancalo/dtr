import { Body, Controller, Post } from '@nestjs/common';
import { ValidateDTO } from '@dtr/common/decorators';
import { ScheduleService } from './schedule.service';
import { CreateSceduleRequestDto } from './dtos';
import { Schedule } from './entities';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly schedService: ScheduleService) {}

  @Post()
  @ValidateDTO(CreateSceduleRequestDto, 'body')
  create(@Body() dto: CreateSceduleRequestDto): Promise<Schedule> {
    return this.schedService.create(dto);
  }
}
