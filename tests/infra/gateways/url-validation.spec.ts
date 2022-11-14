import { UrlValidation } from '@/infra/gateways'
import validator from 'validator'

jest.mock('validator')

describe('Mobile Valitadion', () => {
  let sut: UrlValidation
  let fakeValidator: jest.Mocked<typeof validator>

  beforeAll(() => {
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isURL.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new UrlValidation()
  })

  test('Should call isURL with correct input', () => {
    sut.isValid('any_value')
    expect(fakeValidator.isURL).toHaveBeenCalledWith('any_value')
  })

  test('Should return false if isMobilePhone returns false', () => {
    fakeValidator.isURL.mockReturnValueOnce(false)
    const isValid = sut.isValid('any_value')
    expect(isValid).toBe(false)
  })

  test('Should return true if isURL returns true', () => {
    const isValid = sut.isValid('any_value')
    expect(isValid).toBe(true)
  })
})
