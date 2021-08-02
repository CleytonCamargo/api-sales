import { NextFunction, Request, Response } from 'express'
import Joi, { SchemaMap } from 'joi'
import AppError from '@shared/errors/AppError'

export default class BaseValidator {
  public rules: SchemaMap<any>
  private idValidator = Joi.alternatives()
    .try(Joi.string().uuid(), Joi.string().valid('me'))
    .required()

  constructor(rules: SchemaMap<any>) {
    this.rules = rules
  }

  create = async (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    const data = request.body

    const schema = Joi.object().keys(this.rules)
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

  show = async (request: Request, response: Response, next: NextFunction) => {
    const data = request.params

    const schema = Joi.object().keys({
      id: this.idValidator,
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

  update = async (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    const data = { ...request.body, ...request.params }

    const schema = Joi.object().keys({
      id: this.idValidator,
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

  delete = async (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    const data = request.params

    const schema = Joi.object().keys({
      id: Joi.string().uuid().required(),
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
