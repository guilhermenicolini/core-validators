import { Validation, Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class ExternalValidator implements Validator {
  constructor (
    readonly fieldName: string,
    private readonly validation: Validation,
    readonly value?: any
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && !this.validation.isValid(this.value)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
