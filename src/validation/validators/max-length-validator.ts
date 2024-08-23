import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class MaxLengthValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: string | number,
    private readonly min: number = Infinity
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && typeof this.value === 'string' && this.value.length > this.min) {
      return new InvalidFieldError(this.fieldName, `must have at most ${this.min} characters`)
    }
    if (hasValue(this.value) && typeof this.value === 'number' && this.value > this.min) {
      return new InvalidFieldError(this.fieldName, `must be lower or equal then ${this.min}`)
    }
  }
}
