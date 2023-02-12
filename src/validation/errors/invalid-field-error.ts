export class InvalidFieldError extends Error {
  constructor (fieldName: string, message?: string) {
    super(`${fieldName} ${message ?? 'is invalid'}`)
    this.name = 'InvalidFieldError'
  }
}
