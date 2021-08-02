import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'

interface IRequest {
  userId: string
}

class ShowUserService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}

export default ShowUserService
