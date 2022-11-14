
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidator } from '@/validation/validators'

describe('Min Length Validator', () => {
  test('Should return InvalidFieldError if length is wrong', () => {
    const sut = new MinLengthValidator('any_field', 'any_value', 10)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least 10 characters'))
  })

  test('Should not return on success', () => {
    const sut = new MinLengthValidator('any_field', 'any_value')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
