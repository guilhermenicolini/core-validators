import { Validator } from '../protocols'
import { RequiredFieldError } from '../errors'
import { hasValue } from './utils'

export class RequiredValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value?: any
  ) {}

  validate (): Error | undefined {
    if (!hasValue(this.value)) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}

export class RequiredIfValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly condition: boolean,
    readonly value?: any
  ) {}

  validate (): Error | undefined {
    if (!this.condition) return

    if (!hasValue(this.value)) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
