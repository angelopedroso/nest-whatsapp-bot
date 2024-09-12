import { BadRequestException, PipeTransform } from '@nestjs/common'
import { fromZodError } from 'zod-validation-error'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private zodSchema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.zodSchema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          error: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
