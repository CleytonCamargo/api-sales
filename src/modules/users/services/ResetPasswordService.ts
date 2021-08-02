import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import UserTokenReposity from '../repositories/UserTokenReposity'
import { isAfter, addHours } from 'date-fns'
import UsersRepository from '../repositories/UsersRepository'
import { hash } from 'bcryptjs'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokenReposity)

    const userToken = await userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('Token not found.')
    }

    const user = await usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const compareDate = addHours(userToken.created_at, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token has expired')
    }

    user.password = await hash(password, 8)

    await usersRepository.save(user)
  }
}

export default ResetPasswordService
