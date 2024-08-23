import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class MinLengthValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: string | number,
    private readonly min: number = 0
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && typeof this.value === 'string' && this.value.length < this.min) {
      return new InvalidFieldError(this.fieldName, `must have at least ${this.min} characters`)
    }
    if (hasValue(this.value) && typeof this.value === 'number' && this.value < this.min) {
      return new InvalidFieldError(this.fieldName, `must be greater or equal then ${this.min}`)
    }
  }
}
