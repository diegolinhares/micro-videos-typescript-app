import UseCase from "../../../@seedwork/application/use-case"
import CategoryRepository from "../../domain/repository/category.repository"

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {
  }

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id)
    await this.categoryRepo.delete(entity.id)
  }
}

export default DeleteCategoryUseCase

export type Input = {
  id: string
}

export type Output = void
