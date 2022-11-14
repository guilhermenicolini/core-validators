
import { InvalidFieldError } from '@/validation/errors'
import { ExternalValidator } from '@/validation/validators'
import { Validation } from '@/validation/protocols'

import { MockProxy, mock } from 'jest-mock-extended'

describe('External Validator', () => {
  let validation: MockProxy<Validation>

  beforeAll(() => {
    validation = mock<Validation>()
    validation.isValid.mockReturnValue(true)
  })

  test('Should call Validation with correct input', () => {
    const sut = new ExternalValidator('any_field', validation, 'any_value')
    sut.validate()
    expect(validation.isValid).toHaveBeenCalledWith('any_value')
  })

  test('Should return InvalidFieldError on invalid value', () => {
    validation.isValid.mockReturnValueOnce(false)
    const sut = new ExternalValidator('any_field', validation, 'wrong_value')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('any_field'))
  })

  test('Should not return on valid value', () => {
    const sut = new ExternalValidator('any_field', validation, 'any_value')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
