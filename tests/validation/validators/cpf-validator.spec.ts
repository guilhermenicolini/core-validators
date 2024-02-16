import { InvalidFieldError } from '@/validation/errors'
import { CpfValidator } from '@/validation/validators'

describe('Cpf Validator', () => {
  test('Should return InvalidFieldError if cpf do not have 11 characters', () => {
    const sut = new CpfValidator('any_field', 'abcf')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError if cpf is in black list', () => {
    const sut = new CpfValidator('any_field', '12345678909')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError if cpf is invalid', () => {
    const sut = new CpfValidator('any_field', '54265987456')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should not return if cpf is valid', () => {
    const sut = new CpfValidator('any_field', '68196172087')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
