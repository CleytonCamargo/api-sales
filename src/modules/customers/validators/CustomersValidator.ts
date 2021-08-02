import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class CustomersValidator extends BaseValidator {
  constructor() {
    super({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    })
  }
}
