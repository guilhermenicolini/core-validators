import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class RegexValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value: string,
    private readonly validation: { regex: RegExp, message?: string }
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && !this.validation.regex.test(this.value)) {
      return new InvalidFieldError(this.fieldName, this.validation.message)
    }
  }
}
