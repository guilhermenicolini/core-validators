import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class EnumValidator implements Validator {
  constructor (
    readonly fieldName: string,
    private readonly enumerator: any,
    readonly value?: string | null
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && !Object.values(this.enumerator).includes(this.value)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
