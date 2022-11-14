import {
  RequiredValidator,
  RequiredIfValidator,
  UuidValidator,
  EnumValidator,
  ExternalValidator,
  ArrayValidator,
  NumberValidator,
  MinLengthValidator,
  RegexValidator,
  EmailValidator,
  SameAsValidator
} from '.'
import { Validation, Validator } from '../protocols'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly value?: any,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ fieldName, value }: { fieldName: any, value?: any }): ValidationBuilder {
    return new ValidationBuilder(fieldName, value)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredValidator(this.fieldName, this.value))
    return this
  }

  requiredIf (condition: boolean): ValidationBuilder {
    this.validators.push(new RequiredIfValidator(this.fieldName, condition, this.value))
    return this
  }

  uuid (): ValidationBuilder {
    this.validators.push(new UuidValidator(this.fieldName, this.value))
    return this
  }

  enum (enumerator: any): ValidationBuilder {
    this.validators.push(new EnumValidator(this.fieldName, enumerator, this.value))
    return this
  }

  external (validation: Validation): ValidationBuilder {
    this.validators.push(new ExternalValidator(this.fieldName, validation, this.value))
    return this
  }

  array (min: number = 0): ValidationBuilder {
    this.validators.push(new ArrayValidator(this.fieldName, this.value, min))
    return this
  }

  number (): ValidationBuilder {
    this.validators.push(new NumberValidator(this.fieldName, this.value))
    return this
  }

  min (min: number = 0): ValidationBuilder {
    this.validators.push(new MinLengthValidator(this.fieldName, this.value, min))
    return this
  }

  regex (regex: RegExp, message?: string): ValidationBuilder {
    this.validators.push(new RegexValidator(this.fieldName, this.value, { regex, message }))
    return this
  }

  email (): ValidationBuilder {
    this.validators.push(new EmailValidator(this.fieldName, this.value))
    return this
  }

  sameAs (valueToCompanre: string): ValidationBuilder {
    this.validators.push(new SameAsValidator(this.fieldName, this.value, valueToCompanre))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
