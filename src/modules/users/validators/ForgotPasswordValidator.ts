import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class ForgotPasswordValidator extends BaseValidator {
  constructor() {
    super({
      email: Joi.string().email().required(),
    })
  }
}
