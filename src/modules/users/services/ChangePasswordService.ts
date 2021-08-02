import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import { compare, hash } from 'bcryptjs'

interface IRequest {
  userId: string
  password: string
  oldPassword: string
}

class ChangePasswordService {
  public async execute({
    userId,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithPassword = await usersRepository.findUserWithPasswordById(
      userId,
    )

    const checkOldPassword = await compare(
      oldPassword,
      userWithPassword.password,
    )

    if (!checkOldPassword) {
      throw new AppError('Old password does not match')
    }

    userWithPassword.password = await hash(password, 8)

    await usersRepository.save(userWithPassword)

    return user
  }
}

export default ChangePasswordService
