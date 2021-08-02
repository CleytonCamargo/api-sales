import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class RegisterValidator extends BaseValidator {
  constructor() {
    super({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
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
}
