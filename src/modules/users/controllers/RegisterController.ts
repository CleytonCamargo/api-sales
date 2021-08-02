import { Request, Response } from 'express'
import RegisterService from '../services/RegisterService'

export default class RegisterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const register = new RegisterService()

    const user = await register.execute({
      name,
      email,
      password,
    })

    return response.json(user)
  }
}
