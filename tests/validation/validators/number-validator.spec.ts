import { InvalidFieldError } from '@/validation/errors'
import { NumberValidator } from '@/validation/validators'

describe('Number Validator', () => {
  test('Should return InvalidFieldError if value is a string number', () => {
    const sut = new NumberValidator('any_field', '123')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return InvalidFieldError if value is not a number', () => {
    const sut = new NumberValidator('any_field', 'abc')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return undefined if value is a number', () => {
    const sut = new NumberValidator('any_field', 123)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
