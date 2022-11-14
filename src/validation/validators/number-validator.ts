import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class NumberValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: any
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && typeof this.value !== 'number') {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
