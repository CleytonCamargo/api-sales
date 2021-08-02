import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class ResetPasswordValidator extends BaseValidator {
  constructor() {
    super({
      token: Joi.string().required(),
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
