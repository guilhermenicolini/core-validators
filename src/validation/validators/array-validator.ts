import { Validator } from '../protocols'
import { InvalidFieldError } from '../errors'

export class ArrayValidator implements Validator {
  constructor (
    readonly fieldName: string,
    readonly value?: any | null,
    private readonly min: number = 0
  ) {}

  validate (): Error | undefined {
    if (Array.isArray(this.value)) {
      if (this.value.length < this.min) {
        return new InvalidFieldError(this.fieldName)
      }
    }
  }
}
