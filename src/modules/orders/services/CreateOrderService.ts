import CustomersRepository from '@modules/customers/repositories/CustomersRepository'
import { ProductRepository } from '@modules/products/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'
import BaseService from '@shared/utils/BaseService'
import { getCustomRepository } from 'typeorm'
import Order from '../entities/Order'
import OrderRepository from '../repositories/OrdersRepository'

interface IProduct {
  id: string
  quantity: number
}

interface IRequest {
  customer_id: string
  products: IProduct[]
}

class CreateOrderService extends BaseService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrderRepository)
    const customersRepository = getCustomRepository(CustomersRepository)
    const productsRepository = getCustomRepository(ProductRepository)

    const customerExists = await customersRepository.findById(customer_id)
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id')
    }

    const existsProducts = await productsRepository.findAllByIds(products)

    if (!existsProducts?.length) {
      throw new AppError('Could not find any products with the given ids')
    }

    const existsProductsIds = existsProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    )

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      )
    }
    const quantityAvaiable = products.filter(
      product =>
        existsProducts.filter(existProduct => existProduct.id === product.id)[0]
          .quantity < product.quantity,
    )

    if (quantityAvaiable.length) {
      throw new AppError(
        `The quantity ${quantityAvaiable[0].quantity} is not available for ${quantityAvaiable[0].id}`,
      )
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(
        existProduct => existProduct.id === product.id,
      )[0].price,
    }))

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    })

    const { order_products } = order

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(
          existProduct => existProduct.id === product.product_id,
        )[0].quantity - product.quantity,
    }))

    await productsRepository.save(updatedProductQuantity)

    this.invalidateChacheKeys('api-sales-ORDERS-KEYS')

    return order
  }
}

export default CreateOrderService
