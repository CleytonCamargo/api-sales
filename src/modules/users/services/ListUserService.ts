import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import Cache from '@shared/providers/CacheProvider/CacheProvider'

interface IPaginateUser {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  last_page: number
  data: User[]
}

class ListUserService {
  public async execute(
    perPage?: string,
    page?: string,
  ): Promise<IPaginateUser> {
    const usersRepository = getCustomRepository(UsersRepository)

    const cache = new Cache()

    let users = await cache.recover(`api-sales-USERS--${page}-${perPage}`)

    if (!users) {
      users = await usersRepository.createQueryBuilder().paginate()
      await cache.save(`api-sales-USERS--${page}-${perPage}`, users)
    }

    return users as IPaginateUser
  }
}

export default ListUserService
