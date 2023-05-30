import { InMemorySearchableRepository } from "@seedwork/domain/repository/repository-contracts"
import { Category } from "category/domain/entities/category"
import CategoryRepository from "category/domain/repository/category.repository"

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}