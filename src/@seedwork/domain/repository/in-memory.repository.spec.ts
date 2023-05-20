import Entity from "../entity/entity"
import NotFoundError from "../errors/not-found.error"
import UniqueEntityId from "../value-objects/unique-entity-id.vo"
import InMemoryRepository from "./in-memory.repository"

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository

  beforeEach(() => (repository = new StubInMemoryRepository()))

  it("should inserts a new entity", async () => {
    const entity = new StubEntity({name: "name value", price: 5})
    await repository.insert(entity)

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })

  it("should throws when entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError("Entity not found using id fake id")
    )

    expect(repository.findById(new UniqueEntityId("b4577e39-090b-4ab2-9319-930dac29e0af"))).rejects.toThrow(
      new NotFoundError("Entity not found using id b4577e39-090b-4ab2-9319-930dac29e0af")
    )
  })

  it("should finds entity by id", async () => {
    const entity = new StubEntity({name: "name value", price: 5})
    await repository.insert(entity)

    let entityFound = await repository.findById(entity.id)
    expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON())

    entityFound = await repository.findById(entity.uniqueEntityId)
    expect(entityFound.toJSON()).toStrictEqual(entityFound.toJSON())
  })

  it("should returns all entities", async () => {
    const entity = new StubEntity({name: "name value", price: 5})
    await repository.insert(entity)

    const entities = await repository.findAll()

    expect(entities).toStrictEqual([entity])
  })

  it("should throws error on update when entity not found", () => {
    const entity = new StubEntity({name: "name value", price: 5})
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using id ${entity.id}`)
    )
  })

  it("should updates an entity", async () => {
    const entity = new StubEntity({name: "name value", price: 5})
    await repository.insert(entity)

    const entityUpdated = new StubEntity({name: "updated", price: 1}, entity.uniqueEntityId)

    await repository.update(entityUpdated)

    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })

  it("should throws error on delete when entity not found", () => {
    expect(repository.delete(new UniqueEntityId("b4577e39-090b-4ab2-9319-930dac29e0af"))).rejects.toThrow(
      new NotFoundError("Entity not found using id b4577e39-090b-4ab2-9319-930dac29e0af")
    )
  })

  it("should deletes an entity", async () => {
    let entity = new StubEntity({name: "name value", price: 5})
    await repository.insert(entity)

    await repository.delete(entity.id)
    expect(repository.items).toHaveLength(0)

    entity = new StubEntity({name: "name value", price: 5})
    await repository.insert(entity)

    await repository.delete(entity.uniqueEntityId)
    expect(repository.items).toHaveLength(0)
  })
})