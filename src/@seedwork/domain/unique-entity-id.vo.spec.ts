import InvalidUuidError from "../errors/invalid-uuid.error"
import UniqueEntityId from "./unique-entity-id.vo"
import {validate as uuidValidate} from "uuid"

describe("UniqueEntityId Unit Tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate")

  it("should throw error when UUID is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  it("should accept a uuid passed in constructor", () => {
    const uuid = "7b0868b3-ad35-413b-b1e4-ba93e83d2e73"
    const valueObject = new UniqueEntityId(uuid)

    expect(valueObject.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })

  it("should accept a uuid passed in constructor", () => {
    const valueObject = new UniqueEntityId()

    expect(uuidValidate(valueObject.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})