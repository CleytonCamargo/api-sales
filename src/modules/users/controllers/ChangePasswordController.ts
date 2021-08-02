import { Request, Response } from 'express'
import ChangePasswordService from '../services/ChangePasswordService'

export default class changePasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { password, old_password } = request.body
    const id = request.user.id

    const changePassword = new ChangePasswordService()

    const user = await changePassword.execute({
      userId: id,
      password,
      oldPassword: old_password,
    })

    return response.json(user)
  }
}
