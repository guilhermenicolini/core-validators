import { Validation } from '../../validation/protocols'
import validator from 'validator'

export class UrlValidation implements Validation {
  isValid (value: any): boolean {
    return validator.isURL(value)
  }
}
