import { Category, CategoryProperties } from "#category/domain/entities/category"
import { omit } from "lodash"
import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id.vo"

describe("Category Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn()
  })

  test("constructor of category", () => {
    let category = new Category({ name: "Movie" })
    let props = omit(category.props, "created_at")
    expect(Category.validate).toHaveBeenCalled()
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true
    })
    expect(category.props.created_at).toBeInstanceOf(Date)

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false
    })
    let created_at = new Date()
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at
    })

    category = new Category({
      name: "Movie",
      description: "other description"
    })
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description"
    })

    category = new Category({
      name: "Movie",
      is_active: true
    })
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true
    })

    created_at = new Date()
    category = new Category({
      name: "Movie",
      created_at
    })
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at
    })
  })

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" })
    expect(category.name).toBe("Movie")
  })

  test("setter of name field", () => {
    const category = new Category({ name: "Movie" })
    category["name"] = "other name"
    expect(category.name).toBe("other name")
  })

  test("getter and setter of description field", () => {
    let category = new Category({ name: "Movie" })
    expect(category.description).toBeNull()

    category = new Category({ name: "Movie", description: "some description" })
    expect(category.description).toBe("some description")

    category = new Category({ name: "Movie" })

    // category["description"] = "other description"
    // expect(category.description).toBe("other description")

    category["description"] = undefined
    expect(category.description).toBeNull()

    category["description"] = null
    expect(category.description).toBeNull()
  })

  test("getter and setter of is_active field", () => {
    let category = new Category({ name: "Movie" })
    expect(category.is_active).toBeTruthy()

    category = new Category({ name: "Movie", is_active: true })
    expect(category.is_active).toBeTruthy()

    category = new Category({ name: "Movie", is_active: false })
    expect(category.is_active).toBeFalsy()
  })

  test("getter and setter of created_at field", () => {
    let category = new Category({ name: "Movie" })
    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: "Movie",
      created_at
    })

    expect(category.created_at).toBe(created_at)
  })

  test("ID field", () => {
    type CategoryData = {
      props: CategoryProperties,
      id?: UniqueEntityId
    }

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() }
    ]

    data.forEach(category_data => {
      let category = new Category(category_data.props, category_data.id as any)
      expect(category.id).not.toBeNull()
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    })
  })

  it("should update a category", () => {
    const category = new Category({ name: "Movie" })
    category.update("Documentary", "some description")
    expect(Category.validate).toHaveBeenCalledTimes(2)
    expect(category.name).toBe("Documentary")
    expect(category.description).toBe("some description")
  })

  it("should activate a category", () => {
    const category = new Category({ name: "Movie", is_active: false })
    category.activate()
    expect(category.is_active).toBeTruthy()
  })

  it("should deactivate a category", () => {
    const category = new Category({ name: "Movie", is_active: true })
    category.deactivate()
    expect(category.is_active).toBeFalsy()
  })
})