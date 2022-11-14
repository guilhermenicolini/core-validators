import { MobileValidation } from '@/infra/gateways'
import validator from 'validator'

jest.mock('validator')

describe('Mobile Valitadion', () => {
  let sut: MobileValidation
  let fakeValidator: jest.Mocked<typeof validator>

  beforeAll(() => {
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isMobilePhone.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new MobileValidation()
  })

  test('Should call isMobilePhone with correct input', () => {
    sut.isValid('any_number')
    expect(fakeValidator.isMobilePhone).toHaveBeenCalledWith('any_number', 'any', { strictMode: true })
  })

  test('Should return false if isMobilePhone returns false', () => {
    fakeValidator.isMobilePhone.mockReturnValueOnce(false)
    const isValid = sut.isValid('any_number')
    expect(isValid).toBe(false)
  })

  test('Should return true if isMobilePhone returns true', () => {
    const isValid = sut.isValid('any_number')
    expect(isValid).toBe(true)
  })
})
