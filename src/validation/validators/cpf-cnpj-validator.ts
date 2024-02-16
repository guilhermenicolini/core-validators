import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'
import { isValidCnpj } from './helpers/cnpj'
import { isValidCpf } from './helpers/cpf'

export class CpfCnpjValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value?: string | null
  ) {}

  validate (): Error | undefined {
    if (hasValue(this.value) && ![11, 14].includes(this.value?.length ?? 0)) { return new InvalidFieldError(this.fieldName) }

    if (this.value?.length === 14 && !isValidCnpj(this.value)) {
      return new InvalidFieldError(this.fieldName)
    }

    if (this.value?.length === 11 && !isValidCpf(this.value)) {
      return new InvalidFieldError(this.fieldName)
    }
  }
}
