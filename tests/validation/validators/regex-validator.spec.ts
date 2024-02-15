import { InvalidFieldError } from '@/validation/errors'
import { RegexValidator } from '@/validation/validators'

describe('Regex Validator', () => {
  test('Should return InvalidFieldError with no message if regex fail', () => {
    const sut = new RegexValidator('any_field', '123', { regex: /[a-z]/ })

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError with message if regex fail', () => {
    const sut = new RegexValidator('any_field', '123', { regex: /[a-z]/, message: 'any_message' })

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'any_message'))
  })

  test('Should return undefined if value is a number', () => {
    const sut = new RegexValidator('any_field', 'abc', { regex: /[a-z]/ })

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
