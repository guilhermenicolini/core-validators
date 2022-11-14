import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class UuidValidator implements Validator {
  private readonly regex: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

  constructor (
    readonly fieldName: string,
    readonly value: string
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && !this.regex.test(this.value)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
