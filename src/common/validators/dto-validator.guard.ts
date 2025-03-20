import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

@Injectable()
export class DTOValidator implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const dto = this.reflector.get('dto', context.getHandler());

    if (!dto) return true;

    const validationErrors: Array<ValidationError> = [];
    const transformedData: Record<string, any> = {};

    for (const { dtoClass, source } of dto) {
      const requestDto = plainToInstance(dtoClass, request[source]);

      const errors = validateSync(requestDto, {
        whitelist: true,
        forbidNonWhitelisted: false,
      });

      if (errors.length > 0) {
        validationErrors.push(...errors);
      }

      if (errors.length == 0) {
        transformedData[source] = {
          ...(transformedData[source] || {}),
          ...requestDto,
        };
      }
    }

    if (validationErrors.length > 0) {
      const messages = validationErrors.map((error) => {
        return this.getAllConstraints(error);
      });

      throw new BadRequestException('[' + messages.join(', ') + ']');
    }

    Object.keys(transformedData).forEach((source) => {
      request[source] = transformedData[source];
    });

    return true;
  }

  private getAllConstraints(error: ValidationError): string[] {
    let constraints: string[] = [];

    if (error.constraints) {
      constraints = [...constraints, ...Object.values(error.constraints)];
    }

    if (error.children && error.children.length > 0) {
      error.children.forEach((childError) => {
        constraints = [...constraints, ...this.getAllConstraints(childError)];
      });
    }

    return constraints;
  }
}
