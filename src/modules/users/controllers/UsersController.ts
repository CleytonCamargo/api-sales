import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import ListUserService from '../services/ListUserService'
import ShowUserService from '../services/ShowUserService'
import UpdateUserService from '../services/UpdateUserService'

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { per_page, page } = request.query

    const listUser = new ListUserService()

    const users = await listUser.execute(per_page as string, page as string)

    return response.json(users)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
    })

    return response.json(user)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id == 'me' ? request.user.id : request.params.id

    const showUser = new ShowUserService()

    const user = await showUser.execute({ userId: id })

    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body
    const id = request.params.id === 'me' ? request.user.id : request.params.id

    const updateUser = new UpdateUserService()

    const user = await updateUser.execute({
      userId: id,
      email,
      name,
    })

    return response.json(user)
  }
}
