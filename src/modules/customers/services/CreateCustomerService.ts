import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import Customer from '../entities/Customer'
import CustomersRepository from '../repositories/CustomersRepository'

interface IRequest {
  name: string
  email: string
}

class CreateCustomerService extends BaseService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const emailExists = await customersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const customer = customersRepository.create({
      name,
      email: email.toLowerCase(),
    })

    await customersRepository.save(customer)

    this.invalidateChacheKeys('api-sales-CUSTOMERS-KEYS')

    return customer
  }
}

export default CreateCustomerService
