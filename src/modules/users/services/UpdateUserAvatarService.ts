import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import BaseService from '@shared/utils/BaseService'
import StorageProvider from '@shared/providers/StorageProvider/StorageProvider'

interface IRequest {
  userId: string
  avatarFilename: string
}

class UpdateUserAvatarService extends BaseService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const storageProvider = new StorageProvider()
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar)
    }

    const filename = await storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await usersRepository.save(user)

    this.invalidateChacheKeys('api-sales-USERS-KEYS')

    return user
  }
}

export default UpdateUserAvatarService
