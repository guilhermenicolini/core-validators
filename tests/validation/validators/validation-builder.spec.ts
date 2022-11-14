import {
  RequiredValidator,
  RequiredIfValidator,
  UuidValidator,
  ValidationBuilder,
  EnumValidator,
  ExternalValidator,
  ArrayValidator,
  NumberValidator,
  MinLengthValidator,
  RegexValidator,
  EmailValidator,
  SameAsValidator
} from '@/validation/validators'
import { Validation } from '@/validation/protocols'
import { mock } from 'jest-mock-extended'

describe('ValidationBuilder', () => {
  test('Should return RequiredValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 1 as any })
      .required()
      .build()

    expect(validators).toEqual([new RequiredValidator('any_field', 1)])
  })

  test('Should return RequiredIfValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 1 as any })
      .requiredIf(true)
      .build()

    expect(validators).toEqual([new RequiredIfValidator('any_field', true, 1)])
  })

  test('Should return UuidValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .uuid()
      .build()

    expect(validators).toEqual([new UuidValidator('any_field', 'any_value')])
  })

  test('Should return EnumValidator', () => {
    enum en {
      ok = 'ok'
    }
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .enum(en)
      .build()

    expect(validators).toEqual([new EnumValidator('any_field', en, 'any_value')])
  })

  test('Should return ExternalValidator', () => {
    const spy = mock<Validation>()

    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .external(spy)
      .build()

    expect(validators).toEqual([new ExternalValidator('any_field', spy, 'any_value')])
  })

  test('Should return ArrayValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .array(2)
      .build()

    expect(validators).toEqual([new ArrayValidator('any_field', 'any_value', 2)])
  })

  test('Should return ArrayValidator with default constructor', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .array()
      .build()

    expect(validators).toEqual([new ArrayValidator('any_field', 'any_value', 0)])
  })

  test('Should return NumberValidator with default constructor', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .number()
      .build()

    expect(validators).toEqual([new NumberValidator('any_field', 'any_value')])
  })

  test('Should return MinLengthValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .min(3)
      .build()

    expect(validators).toEqual([new MinLengthValidator('any_field', 'any_value', 3)])
  })

  test('Should return MinLengthValidator with default constructor', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .min()
      .build()

    expect(validators).toEqual([new MinLengthValidator('any_field', 'any_value', 0)])
  })

  test('Should return RegexValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .regex(/regex/, 'any_message')
      .build()

    expect(validators).toEqual([new RegexValidator('any_field', 'any_value', { regex: /regex/, message: 'any_message' })])
  })

  test('Should return EmailValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .email()
      .build()

    expect(validators).toEqual([new EmailValidator('any_field', 'any_value')])
  })

  test('Should return SameAsValidator', () => {
    const validators = ValidationBuilder
      .of({ fieldName: 'any_field', value: 'any_value' })
      .sameAs('another_value')
      .build()

    expect(validators).toEqual([new SameAsValidator('any_field', 'any_value', 'another_value')])
  })
})
