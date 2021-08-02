import { Router } from 'express'
import CustomerController from '../controllers/CustomerController'
import CustomersValidator from '../validators/CustomersValidator'
import isAuthenticated from '@shared/middlewares/isAuthenticated'

const customerRouter = Router()
const customerController = new CustomerController()
const customersValidator = new CustomersValidator()

customerRouter.all('*', isAuthenticated)

customerRouter.get('/', customerController.index)

customerRouter.post('/', customersValidator.create, customerController.create)

customerRouter.get('/:id', customersValidator.show, customerController.show)

customerRouter.put('/:id', customersValidator.update, customerController.update)

customerRouter.delete(
  '/:id',
  customersValidator.delete,
  customerController.delete,
)

export default customerRouter
