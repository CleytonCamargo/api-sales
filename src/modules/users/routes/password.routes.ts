import { Router } from 'express'
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ForgotPasswordValidator from '../validators/ForgotPasswordValidator'
import ResetPasswordController from '../controllers/ResetPasswordController'
import ResetPasswordValidator from '../validators/ResetPasswordValidator'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const forgotPasswordValidator = new ForgotPasswordValidator()
const resetPasswordController = new ResetPasswordController()
const resetPasswordValidator = new ResetPasswordValidator()

passwordRouter.post(
  '/email',
  forgotPasswordController.create,
  forgotPasswordValidator.create,
)
passwordRouter.post(
  '/reset',
  resetPasswordController.create,
  resetPasswordValidator.create,
)

export default passwordRouter
