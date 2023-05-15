import ValidationError from "../../@seedwork/errors/validation-error"
import ValidatorRules from "./validator-rules"

type Values = {
  value: any
  property: string
}

type ExpectedRule = {
  value: any
  property: string
  rule: keyof ValidatorRules
  error: ValidationError
  params?: any
}

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected)
  }).toThrow(expected.error)
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected)
  }).not.toThrow(expected.error)
}

function runRule({
    value,
    property,
    rule,
    params = []
  }: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property)
  const method = validator[rule]
  method.apply(validator, params)
}
describe("ValidatorRules Unit Test", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field")
    expect(validator).toBeInstanceOf(ValidatorRules)
    expect(validator["value"]).toBe("some value")
    expect(validator["property"]).toBe("field")
  })

  test("required validation rule", () => {
    const error = new ValidationError("The field is required")

    let invalidCases = [
      { value: null, property: "field", messageError: "The field is required"},
      { value: undefined, property: "field", messageError: "The field is required"},
      { value: "", property: "field", messageError: "The field is required"}
    ]

    invalidCases.forEach(item => {
      expect(() => {
        ValidatorRules.values(item.value, item.property).required()
      }).toThrow(item.messageError)
    })

    let validCases = [
      { value: 5, property: "field", messageError: "The field is required"},
      { value: false, property: "field", messageError: "The field is required"},
      { value: "test", property: "field", messageError: "The field is required"}
    ]

    validCases.forEach(item => {
      expect(() => {
        ValidatorRules.values(item.value, item.property).required()
      }).not.toThrow(item.messageError)
    })
  })

  test("required string rule", () => {
    const error = new ValidationError("The field is required")

    let invalidCases: Values[] = [
      { value: null, property: "field"},
      { value: undefined, property: "field"},
      { value: "", property: "field"}
    ]

    invalidCases.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error
      })
    })

    let validCases: Values[] = [
      { value: 5, property: "field" },
      { value: false, property: "field" },
      { value: "test", property: "field" }
    ]

    validCases.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error
      })
    })
  })

  test("string validation rule", () => {
    const error = new ValidationError("The field must be a string")

    let invalidCases: Values[] = [
      { value: 5, property: "field"},
      { value: {}, property: "field"},
      { value: false, property: "field"}
    ]

    invalidCases.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error
      })
    })

    let validCases: Values[] = [
      { value: "test", property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" }
    ]

    validCases.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error
      })
    })
  })

  test("maxLength validation rule", () => {
    const error = new ValidationError("The field must be less or equal than 5 characters")

    let invalidCases: Values[] = [
      { value: "aaaaaa", property: "field"}
    ]

    invalidCases.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        params: [5],
        error
      })
    })

    let validCases: Values[] = [
      { value: "aaaaa", property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" }
    ]

    validCases.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        params: [5],
        error
      })
    })
  })

  test("boolean validation rule", () => {
    const error = new ValidationError("The field must be a boolean")

    let invalidCases: Values[] = [
      { value: "a", property: "field"}
    ]

    invalidCases.forEach(item => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error
      })
    })

    let validCases: Values[] = [
      { value: true, property: "field" },
      { value: false, property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" }
    ]

    validCases.forEach(item => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error
      })
    })
  })

  it("should throw a validation error when combine two or more validation rules", () => {
    let validator = ValidatorRules.values(null, "field")
    expect(() => {
      validator.required().string().maxLength(5)
    }).toThrow(new ValidationError("The field is required"))

    validator = ValidatorRules.values(5, "field")
    expect(() => {
      validator.required().string().maxLength(5)
    }).toThrow(new ValidationError("The field must be a string"))

    validator = ValidatorRules.values("aaaaaa", "field")
    expect(() => {
      validator.required().string().maxLength(5)
    }).toThrow(new ValidationError("The field must be less or equal than 5 characters"))

    validator = ValidatorRules.values(null, "field")
    expect(() => {
      validator.required().boolean()
    }).toThrow(new ValidationError("The field is required"))

    validator = ValidatorRules.values(5, "field")
    expect(() => {
      validator.required().boolean()
    }).toThrow(new ValidationError("The field must be a boolean"))
  })

  it("should be valid when combine two or more validation rules", () => {
    expect.assertions(0)

    ValidatorRules.values("test", "field").required().string()
    ValidatorRules.values("aaaaa", "field").required().string().maxLength(5)

    ValidatorRules.values(true, "field").required().boolean()
    ValidatorRules.values(false, "field").required().boolean()
  })
})