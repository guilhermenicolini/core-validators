import { InvalidFieldError } from '@/validation/errors'
import { SameAsValidator } from '@/validation/validators'

describe('SameAs Validator', () => {
  test('Should return InvalidFieldError if values are not the same', () => {
    const sut = new SameAsValidator('any_field', 'any_value', 'another_value')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return undefined if value are the same', () => {
    const sut = new SameAsValidator('any_field', 'any_value', 'any_value')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
