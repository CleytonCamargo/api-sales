import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../repositories/ProductsRepository'

interface IRequest {
  id: string
}

class DeleteProductService extends BaseService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findOne(id)

    if (!product) throw new AppError('Product not found')

    this.invalidateChacheKeys('api-sales-PRODUCTS-KEYS')

    await productsRepository.remove(product)
  }
}

export default DeleteProductService
