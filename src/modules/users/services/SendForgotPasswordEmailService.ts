import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import UserTokenReposity from '../repositories/UserTokenReposity'
import app from '@config/app'
import SendForgotPasswordMail from '../mails/SendForgotPasswordMail'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokenReposity)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email address already used.')
    }

    const userToken = await userTokensRepository.generate(user.id)

    if (!userToken) {
      throw new AppError('An error occurred, please try again later')
    }

    const link = `${app.app_web_url}/password/reset/${userToken.token}`

    const mail = new SendForgotPasswordMail({
      to: email,
      link,
    })

    mail.send()
  }
}

export default SendForgotPasswordEmailService
