import { Router } from 'express'
import OrdersController from '../controllers/OrderController'
import OrdersValidator from '../validators/OrdersValidator'
import isAuthenticated from '@shared/middlewares/isAuthenticated'

const orderRouter = Router()
const ordersController = new OrdersController()
const ordersValidator = new OrdersValidator()

orderRouter.all('*', isAuthenticated)

orderRouter.get('/', ordersController.index)

orderRouter.post('/', ordersValidator.create, ordersController.create)

orderRouter.get('/:id', ordersValidator.show, ordersController.show)

export default orderRouter
