import AppError from '@shared/errors/AppError'
import { EntityRepository, Repository } from 'typeorm'
import User from '../entities/User'

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    })

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email: email.toLowerCase(),
      },
    })

    return user
  }

  public async findUserWithPasswordById(id: string): Promise<User> {
    const user = await this.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'email', 'avatar', 'password'],
    })

    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}

export default UsersRepository
