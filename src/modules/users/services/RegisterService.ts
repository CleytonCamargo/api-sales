import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

class RegisterService extends BaseService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    await usersRepository.save(user)

    this.invalidateChacheKeys('api-sales-USERS-KEYS')

    return user
  }
}

export default RegisterService
