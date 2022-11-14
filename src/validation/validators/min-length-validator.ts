import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class MinLengthValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: string,
    private readonly min: number = 0
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && this.value.length < this.min) {
      return new InvalidFieldError(this.fieldName, `must have at least ${this.min} characters`)
    }
  }
}
