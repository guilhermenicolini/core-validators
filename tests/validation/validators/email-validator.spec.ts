
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidator } from '@/validation/validators'

describe('Email Validator', () => {
  test('Should return InvalidFieldError if email is invalid', () => {
    const sut = new EmailValidator('any_field', 'wrong_email')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should return undefined on email with + sign', () => {
    const sut = new EmailValidator('any_field', 'any+mail@mail.me')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  test('Should return undefined on email with _ sign', () => {
    const sut = new EmailValidator('any_field', 'any_mail@mail.me')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
