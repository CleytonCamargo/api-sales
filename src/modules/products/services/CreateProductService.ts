import Cache from '@shared/providers/CacheProvider/CacheProvider'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../entities/Product'
import { ProductRepository } from '../repositories/ProductsRepository'
import BaseService from '@shared/utils/BaseService'

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService extends BaseService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)
    const productExists = await productsRepository.findByName(name)

    if (productExists)
      throw new AppError('There is already one product with this name')

    const product = productsRepository.create({
      name,
      price,
      quantity,
    })

    await productsRepository.save(product)

    this.invalidateChacheKeys('api-sales-PRODUCTS-KEYS')

    return product
  }
}

export default CreateProductService
