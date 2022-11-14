import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class SameAsValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: string,
    private readonly valueToCompare: string
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && this.value !== this.valueToCompare) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
