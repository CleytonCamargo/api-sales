import Cache from '@shared/providers/CacheProvider/CacheProvider'
import { getCustomRepository } from 'typeorm'
import Product from '../entities/Product'
import { ProductRepository } from '../repositories/ProductsRepository'
import BaseService from '@shared/utils/BaseService'

interface IPaginateProduct {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  last_page: number
  data: Product[]
}

class ListProductService extends BaseService {
  public async execute(
    perPage?: string,
    page?: string,
  ): Promise<IPaginateProduct> {
    const productsRepository = getCustomRepository(ProductRepository)

    const cache = new Cache()

    const key = `api-sales-PRODUCTS-${page}-${perPage}`

    let products = await cache.recover(key)

    if (!products) {
      products = await productsRepository.createQueryBuilder().paginate()
      await cache.save(key, products)

      this.saveNewCacheKey('api-sales-PRODUCTS-KEYS', key)
    }

    return products as IPaginateProduct
  }
}

export default ListProductService
