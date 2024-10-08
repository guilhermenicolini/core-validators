import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidator } from '@/validation/validators'

describe('Min Length Validator', () => {
  test('Should return InvalidFieldError if string length is wrong', () => {
    const sut = new MinLengthValidator('any_field', 'any_value', 10)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least 10 characters'))
  })

  test('Should return InvalidFieldError if number value is greater', () => {
    const sut = new MinLengthValidator('any_field', 50, 100)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'must be greater or equal then 100'))
  })

  test('Should not return on success with string', () => {
    const sut = new MinLengthValidator('any_field', 'any_value')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('Should not return on success with number', () => {
    const sut = new MinLengthValidator('any_field', 50)

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
