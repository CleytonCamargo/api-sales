import AppError from '@shared/errors/AppError'
import BaseValidator from '@shared/utils/BaseValidator'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export default class ChangePasswordValidator extends BaseValidator {
  constructor() {
    super({
      old_password: Joi.string().required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
          ),
        )
        .required(),
      password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
    })
  }

  update = async (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    const data = { ...request.body, ...request.params }

    const schema = Joi.object().keys({
      ...this.rules,
    })
    try {
      await schema.validateAsync(data, { abortEarly: false })
      next()
    } catch (err) {
      throw new AppError(
        err.details.map(
          (err: { context: { key: string }; message: string }) => ({
            field: err.context.key,
            message: err.message,
          }),
        ),
      )
    }
  }
}
