import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class SessionsValidator extends BaseValidator {
  constructor() {
    super({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
  }
}
