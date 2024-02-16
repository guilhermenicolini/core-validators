import { InvalidFieldError } from '@/validation/errors'
import { CnpjValidator } from '@/validation/validators'

describe('Cnpj Validator', () => {
  test('Should return InvalidFieldError if cnpj do not have 14 characters', () => {
    const sut = new CnpjValidator('any_field', 'abcf')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError if cnpj is in black list', () => {
    const sut = new CnpjValidator('any_field', '99999999999999')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError if cnpj is invalid', () => {
    const sut = new CnpjValidator('any_field', '76345987000765')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should not return if cnpj is valid', () => {
    const sut = new CnpjValidator('any_field', '86054664000159')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
