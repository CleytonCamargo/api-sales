import { Request, Response } from 'express'
import CreateOrderService from '../services/CreateOrderService'
import ListOrderService from '../services/ListOrderService'
import ShowOrderService from '../services/ShowOrderService'

export default class OrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { per_page, page } = request.query

    const listOrders = new ListOrderService()

    const orders = await listOrders.execute(per_page as string, page as string)

    return response.json(orders)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body

    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({ customer_id, products })

    return response.json(order)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showOrder = new ShowOrderService()

    const order = await showOrder.execute({ id })

    return response.json(order)
  }
}
