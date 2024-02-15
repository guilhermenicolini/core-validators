import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'
import { hasValue } from './utils'

export class PasswordValidator implements Validator {
  private readonly options: {
    min: number
    lowercase: boolean
    uppercase: boolean
    numeric: boolean
  }

  constructor (
    readonly fieldName: string,
    readonly value: any,
    options?: {
      min?: number
      lowercase?: boolean
      uppercase?: boolean
      numeric?: boolean
    }
  ) {
    this.options = {
      min: options?.min ?? 8,
      lowercase: options?.lowercase ?? true,
      uppercase: options?.uppercase ?? true,
      numeric: options?.numeric ?? true
    }
  }

  validate (): Error | undefined {
    if (hasValue(this.value) && this.options.min > 0 && this.value.length < this.options.min) {
      return new InvalidFieldError(this.fieldName, `must have at least ${this.options.min} character${this.options.min > 1 ? 's' : ''}`)
    }

    if (hasValue(this.value) && this.options.lowercase && !/[a-z]/.test(this.value)) {
      return new InvalidFieldError(this.fieldName, 'must have at least one lowercase character')
    }

    if (hasValue(this.value) && this.options.uppercase && !/[A-Z]/.test(this.value)) {
      return new InvalidFieldError(this.fieldName, 'must have at least one uppercase character')
    }

    if (hasValue(this.value) && this.options.numeric && !/[0-9]/.test(this.value)) {
      return new InvalidFieldError(this.fieldName, 'must have at least one numeric character')
    }
  }
}
