import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import CustomersRepository from '../repositories/CustomersRepository'

interface IRequest {
  id: string
}

class DeleteProductService extends BaseService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)

    if (!customer) throw new AppError('Product not found')

    await customersRepository.softRemove(customer)

    this.invalidateChacheKeys('api-sales-CUSTOMERS-KEYS')
  }
}

export default DeleteProductService
