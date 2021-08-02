import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import Customer from '../entities/Customer'
import CustomersRepository from '../repositories/CustomersRepository'

interface IRequest {
  id: string
  name: string
  email: string
}

class UpdateCustomerService extends BaseService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)

    if (!customer) {
      throw new AppError('User not found')
    }

    const customerUpdateEmail = await customersRepository.findByEmail(email)

    if (customerUpdateEmail && customerUpdateEmail.id !== customer.id) {
      throw new AppError('There is already one user with this email')
    }

    customer.email = email
    customer.name = name

    await customersRepository.save(customer)

    this.invalidateChacheKeys('api-sales-CUSTOMERS-KEYS')

    return customer
  }
}

export default UpdateCustomerService
