import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import SendPasswordMail from '../mails/SendPasswordMail'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import BaseService from '@shared/utils/BaseService'

interface IRequest {
  name: string
  email: string
}

class CreateUserService extends BaseService {
  public async execute({ name, email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const password = this.randomPassword()

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    await usersRepository.save(user)

    const passwordMail = new SendPasswordMail({
      to: email,
      password: password,
    })

    passwordMail.send()

    this.invalidateChacheKeys('api-sales-USERS-KEYS')

    return user
  }

  private randomPassword(): string {
    const length = 8
    const specials = '@$!%*?&'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'

    const allCharacters = specials + lowercase + uppercase + numbers

    let password = ''
    for (let i = 0, n = allCharacters.length; i < length; ++i) {
      password += allCharacters.charAt(Math.floor(Math.random() * n))
    }

    return password
  }
}

export default CreateUserService
