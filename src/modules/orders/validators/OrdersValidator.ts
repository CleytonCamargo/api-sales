import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class OrdersValidator extends BaseValidator {
  constructor() {
    super({
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().items(
        Joi.object({
          id: Joi.string().uuid(),
          quantity: Joi.number(),
        }).required(),
      ),
    })
  }
}
