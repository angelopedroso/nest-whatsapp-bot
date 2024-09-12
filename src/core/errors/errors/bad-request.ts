import type { UseCaseError } from '../use-case-error'

export class BadRequestException extends Error implements UseCaseError {
  constructor(field: string) {
    super(`Invalid body - ${field}`)
  }
}
