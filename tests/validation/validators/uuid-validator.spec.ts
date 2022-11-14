
import { InvalidFieldError } from '@/validation/errors'
import { UuidValidator } from '@/validation/validators'

describe('Uuid Validator', () => {
  test('Should return InvalidFieldError if uuid is invalid', () => {
    const sut = new UuidValidator('any_field', 'abcd')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return undefined if uuid is valid', () => {
    const sut = new UuidValidator('any_field', '0a2b3c4d-0a1b-40a1-8a01-0a1b2c3d4e5f')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
