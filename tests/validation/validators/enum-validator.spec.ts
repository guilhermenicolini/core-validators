import { InvalidFieldError } from '@/validation/errors'
import { EnumValidator } from '@/validation/validators'

enum CustomEnum {
  exists = 'exists'
}

describe('Enum Validator', () => {
  test('Should return InvalidFieldError if enum is invalid', () => {
    const sut = new EnumValidator('any_field', CustomEnum, 'not_exists')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return undefined if enum is valid', () => {
    const sut = new EnumValidator('any_field', CustomEnum, 'exists')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
