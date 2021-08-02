import { getCustomRepository } from 'typeorm'
import Order from '../entities/Order'
import OrdersRepository from '../repositories/OrdersRepository'
import Cache from '@shared/providers/CacheProvider/CacheProvider'
import BaseService from '@shared/utils/BaseService'

interface IPaginateOrder {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  last_page: number
  data: Order[]
}

class ListOrderService extends BaseService {
  public async execute(
    perPage?: string,
    page?: string,
  ): Promise<IPaginateOrder> {
    const ordersRepository = getCustomRepository(OrdersRepository)

    const cache = new Cache()

    const key = `api-sales-ORDERS-${page}-${perPage}`

    let orders = await cache.recover(key)
    if (!orders) {
      orders = await ordersRepository.createQueryBuilder().paginate()
      await cache.save(key, orders)

      this.saveNewCacheKey('api-sales-ORDERS-KEYS', key)
    }

    return orders as IPaginateOrder
  }
}

export default ListOrderService
