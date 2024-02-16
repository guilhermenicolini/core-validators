import { InvalidFieldError } from '@/validation/errors'
import { CpfCnpjValidator } from '@/validation/validators'

describe('CpfCnpj Validator', () => {
  test('Should return InvalidFieldError if value has invalid length', () => {
    const sut = new CpfCnpjValidator('any_field', 'abcf')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError if cpf is invalid', () => {
    const sut = new CpfCnpjValidator('any_field', '54265987456')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should not return if cpf is valid', () => {
    const sut = new CpfCnpjValidator('any_field', '68196172087')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('Should return InvalidFieldError if cnpj is invalid', () => {
    const sut = new CpfCnpjValidator('any_field', '76345987000765')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should not return if cnpj is valid', () => {
    const sut = new CpfCnpjValidator('any_field', '86054664000159')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
