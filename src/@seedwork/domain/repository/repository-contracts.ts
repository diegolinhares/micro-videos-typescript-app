import Entity from "../entity/entity"
import UniqueEntityId from "../value-objects/unique-entity-id.vo"
import { InMemoryRepository } from "./in-memory.repository"

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>
  findById(id: string | UniqueEntityId): Promise<E>
  findAll(): Promise<E[]>
  update(entity: E): Promise<void>
  delete(id: string | UniqueEntityId): Promise<void>
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchParams,
  SearchResult
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchResult>
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any> {

  search(props: any): Promise<any> {
    throw new Error("Method not implemented.")
  }
}