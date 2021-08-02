import app from '@config/app'
import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

const exeptionError = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: app.debug ? error.toString() : '',
  })
}

export default exeptionError
