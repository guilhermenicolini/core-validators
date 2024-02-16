import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'
import { isValidCnpj } from './helpers/cnpj'

export class CnpjValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value?: string | null
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && !isValidCnpj(this.value as string)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
