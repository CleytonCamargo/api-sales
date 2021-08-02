import { Router } from 'express'
import ProductsController from '../controllers/ProductController'
import ProductsValidator from '../validators/ProductsValidator'
import isAuthenticated from '@shared/middlewares/isAuthenticated'

const productsRouter = Router()
const productsController = new ProductsController()
const productsValidator = new ProductsValidator()

productsRouter.all('*', isAuthenticated)

productsRouter.get('/', productsController.index)

productsRouter.post('/', productsValidator.create, productsController.create)

productsRouter.get('/:id', productsValidator.show, productsController.show)

productsRouter.put('/:id', productsValidator.update, productsController.update)

productsRouter.delete(
  '/:id',
  productsValidator.delete,
  productsController.delete,
)

export default productsRouter
