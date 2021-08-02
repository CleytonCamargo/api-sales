import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'

interface IRequest {
  userId: string
  name: string
  email: string
}

class UpdateUserService extends BaseService {
  public async execute({ userId, name, email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    const userUpdateEmail = await usersRepository.findByEmail(email)

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError('There is already one user with this email')
    }

    user.email = email
    user.name = name

    await usersRepository.save(user)

    this.invalidateChacheKeys('api-sales-USERS-KEYS')

    return user
  }
}

export default UpdateUserService
