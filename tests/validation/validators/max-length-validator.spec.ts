import { InvalidFieldError } from '@/validation/errors'
import { MaxLengthValidator } from '@/validation/validators'

describe('Max Length Validator', () => {
  test('Should return InvalidFieldError if string length is wrong', () => {
    const sut = new MaxLengthValidator('any_field', 'any_value', 5)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'must have at most 5 characters'))
  })

  test('Should return InvalidFieldError if number value is greater', () => {
    const sut = new MaxLengthValidator('any_field', 100, 50)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'must be lower or equal then 50'))
  })

  test('Should not return on success with string', () => {
    const sut = new MaxLengthValidator('any_field', 'any_value')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('Should not return on success with number', () => {
    const sut = new MaxLengthValidator('any_field', 100)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
