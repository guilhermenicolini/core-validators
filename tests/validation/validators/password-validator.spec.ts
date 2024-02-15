import { InvalidFieldError } from '@/validation/errors'
import { PasswordValidator } from '@/validation/validators'

describe('Password Validator', () => {
  test('Should validate value with default length', () => {
    const sut = new PasswordValidator('any_field', 'a')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least 8 characters'))
  })

  describe('default values', () => {
    test('Should validate value with default lowercase', () => {
      const sut = new PasswordValidator('any_field', 'PASSWORD')

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least one lowercase character'))
    })

    test('Should validate value with default uppercase', () => {
      const sut = new PasswordValidator('any_field', 'password')

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least one uppercase character'))
    })

    test('Should validate value with default numeric', () => {
      const sut = new PasswordValidator('any_field', 'PASSword')

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least one numeric character'))
    })

    test('Should not return on success with all default values', () => {
      const sut = new PasswordValidator('any_field', 'P@ssw0rd')

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  describe('min', () => {
    test('Should return InvalidFieldError if length is wrong', () => {
      const sut = new PasswordValidator('any_field', 'pas', { min: 4, lowercase: false, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least 4 characters'))
    })

    test('Should not return on success with the same length', () => {
      const sut = new PasswordValidator('any_field', 'pass', { min: 4, lowercase: false, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })

    test('Should not return on success with greater length', () => {
      const sut = new PasswordValidator('any_field', 'password', { min: 4, lowercase: false, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  describe('lowercase', () => {
    test('Should return InvalidFieldError if value do not have any lowercase character', () => {
      const sut = new PasswordValidator('any_field', '1', { min: 1, lowercase: true, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least one lowercase character'))
    })

    test('Should not return on success with lowercase enabled', () => {
      const sut = new PasswordValidator('any_field', 'a', { min: 1, lowercase: true, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })

    test('Should not return on success with lowercase disabled', () => {
      const sut = new PasswordValidator('any_field', '1', { min: 1, lowercase: false, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  describe('uppercase', () => {
    test('Should return InvalidFieldError if value do not have any uppercase character', () => {
      const sut = new PasswordValidator('any_field', 'a', { min: 1, lowercase: false, uppercase: true, numeric: false })

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least one uppercase character'))
    })

    test('Should not return on success with uppercase enabled', () => {
      const sut = new PasswordValidator('any_field', 'A', { min: 1, lowercase: false, uppercase: true, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })

    test('Should not return on success with uppercase disabled', () => {
      const sut = new PasswordValidator('any_field', 'a', { min: 1, lowercase: false, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  describe('numeric', () => {
    test('Should return InvalidFieldError if value do not have any numeric character', () => {
      const sut = new PasswordValidator('any_field', 'a', { min: 1, lowercase: false, uppercase: false, numeric: true })

      const error = sut.validate()

      expect(error).toEqual(new InvalidFieldError('any_field', 'must have at least one numeric character'))
    })

    test('Should not return on success with numeric enabled', () => {
      const sut = new PasswordValidator('any_field', '1', { min: 1, lowercase: false, uppercase: false, numeric: true })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })

    test('Should not return on success with numeric disabled', () => {
      const sut = new PasswordValidator('any_field', 'a', { min: 1, lowercase: false, uppercase: false, numeric: false })

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })
})
