import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class MaxLengthValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: string | number,
    private readonly max: number = Infinity
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && typeof this.value === 'string' && this.value.length > this.max) {
      return new InvalidFieldError(this.fieldName, `must have at most ${this.max} characters`)
    }
    if (hasValue(this.value) && typeof this.value === 'number' && this.value > this.max) {
      return new InvalidFieldError(this.fieldName, `must be lower or equal then ${this.max}`)
    }
  }
}
