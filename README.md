# **Core Validators**
This library maintains all data validations

## Get Started
```
nvm use
npm install
```
This will install all dependencies and install git hooks

## Recommended Commit Message Format
```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: Optional, can be anything specifying the scope of the commit change.
  |                          For example $location|$browser|$compile|$rootScope|ngHref|ngClick|ngView, etc.
  |                          In App Development, scope can be a page, a module or a component.
  │
  └─⫸ Commit Type: feat|fix|docs|style|refactor|test|chore|perf|ci|build|temp
```

## Development
```
npm run test:unit
```
Keep watching unit tests while coding

## Commits and Pushes
Commits message should follow recommendations above.
On pre-commit all related tests based on staged files should be valid
On pre-push all tests should be valid

## Pre-deploy
```
npm login
```
Login into NPM.

## Deploy
Change package.json version
```
npm run deploy
```
Compile the typescript project into javascript on destination folder and publish package on NPM

## Documentation

### Installation
```
npm install @guilhermenicolini/core-validators@latest
```

### Usage

#### ValidationBuilder
```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  const validators = [
    ...Builder.of({ fieldName: 'id', value: 'my-id' }).required().uuid().build(),
    ...Builder.of({ fieldName: 'name', value: 'John Doe' }).required().build()
  ]
```

#### ValidationComposite
```
  import { Validator, ValidationComposite as Composite } from '@guilhermenicolini/core-validators'

  validate (validators: Validator[]): Error | undefined {
    return new Composite(validators).validate()
  }
```

#### Available Validators

> ##### Required (RequiredValidator)
Validate if value has value
```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('name', 'John Doe').required().build()
```

> ##### RequiredIf (RequiredIfValidator)
Validate if value has value based on a condition
```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('lastname', 'Doe').requiredIf(name?.length > 0).build()
```

> ##### Uuid (UuidValidator)
Validate if value is a valid uuidv4
```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('id', 'g5234234-2345234-343').uuid().build()
```

> ##### Enum (EnumValidator)
Validate if value is a valid enum value
```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('status', 'active').enum(StatusEnum).build()
```

> ##### Subdomain (SubDomainValidator)
Validate if value is a valid subdomain name
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('subdomain', 'www').subdomain().build()
```

> ##### Array (ArrayValidator)
Validate if value is a valid array with specific min length if necessary
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('entries', []).array().build()
```

> ##### Number (NumberValidator)
Validate if value is a number type
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', 123).number().build()
```

> ##### Min (MinLengthValidator)
Validate if value has a min length
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').min(8).build()
```

> ##### Regex (RegexValidator)
Validate if value matches a regex
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').regex(/[a-z]/, 'must have at least one lower case character').build()
```

> ##### Email (EmailValidator)
Validate if value is a valid e-mail
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', 'john.doe@inbox.me').email().build()
```

> ##### SameAs (SameAsValidator)
Validate if values are the same
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').sameAs('456').build()
```

> ##### External (ExternalValidator)
Validate using an external validation
  ```
  import { ValidationBuilder as Builder, MobileValidation } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').external(new MobileValidation()).build()
```

> ##### Password (PasswordValidator)
Validate if value is password
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').password().build()
```
Options:
- min: minimal value length, default is 8
- lowercase: at least one lowercase character, default is true
- uppercase: at least one uppercase character, default is true
- numeric: at least one numeric character, default is true

> ##### Cpf (CpfValidator)
Validate if value is CPF
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').cpf().build()
```

> ##### Cnpj (CnpjValidator)
Validate if value is CNPJ
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').cnpj().build()
```

> ##### CpfCnpj (CpfCnpjValidator)
Validate if value is CPF or CNPJ
  ```
  import { ValidationBuilder as Builder } from '@guilhermenicolini/core-validators'

  Builder.of('value', '123').cpfcnpj().build()
```

#### Available Validations

> ##### MobileValidation
Check if value is a mobile phone with country code
```
  import { MobileValidation } from '@guilhermenicolini/core-validators'

  const mob = new MobileValidation()
  mob.isValid('+5511998765432')
```

> ##### UrlValidation
Check if value is a valid url
```
  import { UrlValidation } from '@guilhermenicolini/core-validators'

  const url = new UrlValidation()
  url.isValid('https://domain.com')
```

#### Available Errors

> ##### RequiredFieldError
```
  import { RequiredFieldError } from '@guilhermenicolini/core-validators'

  throw new RequiredFieldError('name')
```

> ##### InvalidFieldError
```
  import { InvalidFieldError } from '@guilhermenicolini/core-validators'

  throw new InvalidFieldError('name')
```

#### Available Interfaces

> ##### Validator
Create custom validators
```
  import { Validator, InvalidFieldError } from '@guilhermenicolini/core-validators'

  export  class  TestValidator  implements  Validator {
    constructor (
    readonly  fieldName: string,
    readonly  value?: any
    ) {}

    validate (): Error | undefined {
      if (this.value !== 'test') {
        return new InvalidFieldError(this.fieldName)
      }
    }
  }
```

> ##### Validation
Create custom validation to use with external libraries
```
  import { Validation, InvalidFieldError } from '@guilhermenicolini/core-validators'
  import { isEmail } from 'validator'

  export  class  EmailValidation  implements  Validation {
    constructor (
    readonly  fieldName: string,
    readonly  value?: any
    ) {}

    isValid (): boolean {
      return isEmail(this.value)
    }
  }
```

### Principles

* Single Responsability Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Separation of Concerns (SOC)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)
* Composition Over Inheritance

> ### Design Patterns

* Composite
* Builder
* Dependency Injection

> ### Methodologies

* TDD
* Clean Architecture
* DDD

> ###Libraries and Tools

* Typescript
* Jest
* Eslint
* Husky
* Validator
