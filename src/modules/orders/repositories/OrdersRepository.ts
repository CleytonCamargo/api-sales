import { EntityRepository, Repository } from 'typeorm'
import Customer from '@modules/customers/entities/Customer'
import Order from '../entities/Order'

interface IProduct {
  product_id: string
  quantity: number
  price: number
}

interface IRequest {
  customer: Customer
  products: IProduct[]
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const customer = await this.findOne(id, {
      relations: ['order_products', 'customer'],
    })

    return customer
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    })

    await this.save(order)

    return order
  }
}

export default OrdersRepository
