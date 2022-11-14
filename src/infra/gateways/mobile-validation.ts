import { Validation } from '../../validation/protocols'
import validator from 'validator'

export class MobileValidation implements Validation {
  isValid (value: any): boolean {
    return validator.isMobilePhone(value, 'any', { strictMode: true })
  }
}
