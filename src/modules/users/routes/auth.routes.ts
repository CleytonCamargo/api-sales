import { Router } from 'express'
import RegisterController from '../controllers/RegisterController'
import SessionsController from '../controllers/SessionsController'
import RegisterValidator from '../validators/RegisterValidator'
import SessionsValidator from '../validators/SessionsValidator'

const authRouter = Router()
const sessionsController = new SessionsController()
const sessionsValidator = new SessionsValidator()
const registerController = new RegisterController()
const registerValidator = new RegisterValidator()

authRouter.post('/token', sessionsValidator.create, sessionsController.create)
authRouter.post(
  '/register',
  registerValidator.create,
  registerController.create,
)

export default authRouter
