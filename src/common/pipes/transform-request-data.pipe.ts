import { ValidationPipe } from '@nestjs/common';

export const TransformRequestDataPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
});
