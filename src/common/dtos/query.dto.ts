import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class BaseQueryOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  perPage = 10;

  get skip(): number {
    return (this.page - 1) * this.perPage;
  }
}
