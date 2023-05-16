import ClassValidatorFields from "../class-validator-fields"
import * as libClassValidators from "class-validator"

describe("ClassValidatorFields Unit Tests", () => {
  class StubClassValidatorFields extends ClassValidatorFields<{field: string}> {
  }

  it("should initialize errors and validatedData variables with null", () => {
    const validator = new StubClassValidatorFields()
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toBeNull()
  })

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidators, "validateSync")
    spyValidateSync.mockReturnValue([
      {
        property: "field",
        constraints: {
          isRequired: "some error"
        }
      }
    ])

    const validator = new StubClassValidatorFields()
    expect(validator.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(validator.validatedData).toBeNull()
    expect(validator.errors).toStrictEqual({field: ["some error"]})
  })

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidators, "validateSync")
    spyValidateSync.mockReturnValue([])

    const validator = new StubClassValidatorFields()
    expect(validator.validate({field: "value 1"})).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(validator.validatedData).toStrictEqual({field: "value 1"})
    expect(validator.errors).toBeNull()
  })
})