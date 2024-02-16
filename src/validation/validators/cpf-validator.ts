import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'
import { isValidCpf } from './helpers/cpf'

export class CpfValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value?: string | null
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && !isValidCpf(this.value as string)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
