import { getCustomRepository } from 'typeorm'
import Customer from '../entities/Customer'
import CustomersRepository from '../repositories/CustomersRepository'
import Cache from '@shared/providers/CacheProvider/CacheProvider'
import BaseService from '@shared/utils/BaseService'

interface IPaginateCustomer {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  last_page: number
  data: Customer[]
}

class ListCustomerService extends BaseService {
  public async execute(
    perPage?: string,
    page?: string,
  ): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const cache = new Cache()

    const key = `api-sales-CUSTOMERS-${page}-${perPage}`

    let customers = await cache.recover(key)

    if (!customers) {
      customers = await customersRepository.createQueryBuilder().paginate()
      await cache.save(key, customers)

      this.saveNewCacheKey('api-sales-CUSTOMERS-KEYS', key)
    }

    return customers as IPaginateCustomer
  }
}

export default ListCustomerService
