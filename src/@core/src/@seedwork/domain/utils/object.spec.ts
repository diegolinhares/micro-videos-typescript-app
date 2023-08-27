import { deepFreeze } from "./object"

describe("Object unit tests", () => {
  it("should not freeze a scalar object", () => {
    const str = deepFreeze("a")
    expect(typeof str).toBe("string")

    let boolean = deepFreeze(true)
    expect(typeof boolean).toBe("boolean")

    boolean = deepFreeze(false)
    expect(typeof boolean).toBe("boolean")

    let num = deepFreeze(5)
    expect(typeof num).toBe("number")
  })

  it("should must be a immutable object", () => {
    const obj = deepFreeze({prop1: "value1", deep: { prop2: "value2", prop3: new Date()}})

    expect(() => {
      (obj as any).prop1 = "aaaaa"
    }).toThrow("Cannot assign to read only property 'prop1'")

    expect(() => {
      (obj as any).deep.prop2 = "aaaaa"
    }).toThrow("Cannot assign to read only property 'prop2'")

    expect(typeof obj).toBe("object")
    expect(obj.deep.prop3).toBeInstanceOf(Date)
  })
})