import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class EmailValidator implements Validator {
  private readonly regex: RegExp = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i

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
