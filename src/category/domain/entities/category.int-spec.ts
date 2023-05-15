import ValidationError from "../../../@seedwork/errors/validation-error"
import { Category } from "./category"

describe("Category Integration Tests", () => {
  describe("creating a category", () => {
    it("should be a invalid category using name property", () => {
      expect(() => new Category({name: null})).toThrow(
        new ValidationError("The name is required")
      )

      expect(() => new Category({name: ""})).toThrow(
        new ValidationError("The name is required")
      )

      expect(() => new Category({name: 5 as any})).toThrow(
        new ValidationError("The name must be a string")
      )

     expect(() => new Category({name: "t".repeat(256)})).toThrow(
        new ValidationError("The name must be less or equal than 255 characters")
      )

     expect(() => new Category({name: "t".repeat(256)})).toThrow(
        new ValidationError("The name must be less or equal than 255 characters")
      )
    })

    it("should be a invalid category using description property", () => {
      expect(() => new Category({name: "Movie", description: 5 as any})).toThrow(
        new ValidationError("The description must be a string")
      )
    })

    it("should be a invalid category using is_active property", () => {
      expect(() => new Category({name: "Movie", is_active: 5 as any})).toThrow(
        new ValidationError("The is_active must be a boolean")
      )
    })

    it("should be a valid category", () => {
      expect.assertions(0)

      new Category({name: "Movie"}) // NOSONAR
      new Category({name: "Movie", description: "some description"}) // NOSONAR
      new Category({name: "Movie", description: null}) // NOSONAR
      /* NOSONAR */ new Category({
        name: "Movie",
        description: "some description",
        is_active: false
      })
      /* NOSONAR */ new Category({
        name: "Movie",
        description: "other description",
        is_active: true
      })
    })
  })

  describe("update a category", () => {
    it("should be a invalid category using name property", () => {
      const category = new Category({name: "Movie"})
      expect(() => category.update(null, null)).toThrow(
        new ValidationError("The name is required")
      )
      expect(() => category.update("", null)).toThrow(
        new ValidationError("The name is required")
      )
      expect(() => category.update(5 as any, null)).toThrow(
        new ValidationError("The name must be a string")
      )
      expect(() => category.update("t".repeat(256), null)).toThrow(
        new ValidationError("The name must be less or equal than 255 characters")
      )
    })

    it("should be a invalid category using name property", () => {
      const category = new Category({name: "Movie"})
      expect(() => category.update("Movie", 5 as any)).toThrow(
        new ValidationError("The description must be a string")
      )
    })

    it("should be a valid category", () => {
      expect.assertions(0)

      const category = new Category({name: "Movie"})
      category.update("name changed", null)
      category.update("name changed", "some description")
    })
  })
})