
import { RequiredFieldError } from '@/validation/errors'
import {
  RequiredValidator,
  RequiredIfValidator
} from '@/validation/validators'

describe('Required Validator', () => {
  describe('Required', () => {
    test('Should return RequiredFieldError if value is null', () => {
      const sut = new RequiredValidator('any_field', null)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError('any_field'))
    })

    test('Should return RequiredFieldError if value is undefined', () => {
      const sut = new RequiredValidator('any_field', undefined)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError('any_field'))
    })

    test('Should return RequiredFieldError if value is empty', () => {
      const sut = new RequiredValidator('any_field', '')

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError('any_field'))
    })

    test('Should return undefined if value is not empty', () => {
      const sut = new RequiredValidator('any_field', 'any_value')

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  describe('RequiredIf', () => {
    test('Should not return if condition is false', () => {
      const sut = new RequiredIfValidator('any_field', false)

      const error = sut.validate()

      expect(error).toBeUndefined()
    })

    test('Should return RequiredFieldError if value is null', () => {
      const sut = new RequiredIfValidator('any_field', true, null)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError('any_field'))
    })

    test('Should return RequiredFieldError if value is undefined', () => {
      const sut = new RequiredIfValidator('any_field', true, undefined)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError('any_field'))
    })

    test('Should return RequiredFieldError if value is empty', () => {
      const sut = new RequiredIfValidator('any_field', true, '')

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError('any_field'))
    })

    test('Should return undefined if value is not empty', () => {
      const sut = new RequiredValidator('any_field', 'any_value')

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })
})
