import { InvalidFieldError } from '@/validation/errors'
import { ArrayValidator } from '@/validation/validators'

describe('Array Validator', () => {
  test('Should not return if value is not array', () => {
    const sut = new ArrayValidator('any_field', 'not_Array')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('Should return InvalidFieldError if array does not have min length', () => {
    const sut = new ArrayValidator('any_field', [], 1)

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should not return on success', () => {
    const sut = new ArrayValidator('any_field', [])

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
