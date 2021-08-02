import BaseValidator from '@shared/utils/BaseValidator'
import Joi from 'joi'

export default class ProductsValidator extends BaseValidator {
  constructor() {
    super({
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    })
  }
}
