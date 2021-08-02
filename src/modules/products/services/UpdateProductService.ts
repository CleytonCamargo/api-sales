import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import Product from '../entities/Product'
import { ProductRepository } from '../repositories/ProductsRepository'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService extends BaseService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findOne(id)

    if (!product) throw new AppError('Product not found')

    const productExists = await productsRepository.findByName(name)

    if (productExists && productExists.id !== product.id)
      throw new AppError('There is already one product with this name')

    product.name = name
    product.price = price
    product.quantity = quantity

    await productsRepository.save(product)

    this.invalidateChacheKeys('api-sales-PRODUCTS-KEYS')

    return product
  }
}

export default UpdateProductService
