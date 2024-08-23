import {
  RequiredValidator,
  RequiredIfValidator,
  UuidValidator,
  EnumValidator,
  ExternalValidator,
  ArrayValidator,
  NumberValidator,
  MaxLengthValidator,
  MinLengthValidator,
  RegexValidator,
  EmailValidator,
  SameAsValidator,
  PasswordValidator,
  CpfValidator,
  CnpjValidator,
  CpfCnpjValidator
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

  max (max: number = Infinity): ValidationBuilder {
    this.validators.push(new MaxLengthValidator(this.fieldName, this.value, max))
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

  sameAs (valueToCompare: string): ValidationBuilder {
    this.validators.push(new SameAsValidator(this.fieldName, this.value, valueToCompare))
    return this
  }

  password (options?: { min?: number, lowercase?: boolean, uppercase?: boolean, numeric?: boolean }): ValidationBuilder {
    this.validators.push(new PasswordValidator(this.fieldName, this.value, options))
    return this
  }

  cpf (): ValidationBuilder {
    this.validators.push(new CpfValidator(this.fieldName, this.value))
    return this
  }

  cnpj (): ValidationBuilder {
    this.validators.push(new CnpjValidator(this.fieldName, this.value))
    return this
  }

  cpfcnpj (): ValidationBuilder {
    this.validators.push(new CpfCnpjValidator(this.fieldName, this.value))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
