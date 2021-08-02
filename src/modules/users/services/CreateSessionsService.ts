import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email.toLocaleLowerCase())

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { password: userPassword } =
      await usersRepository.findUserWithPasswordById(user.id)

    const passwordConfirmed = await compare(password, userPassword)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default CreateSessionsService
