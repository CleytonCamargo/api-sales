import { Request, Response } from 'express'
import CreateCustomerService from '../services/CreateCustomerService'
import DeleteCustomer from '../services/DeleteCustomerService'
import ListCustomerService from '../services/ListCustomerService'
import ShowCustomer from '../services/ShowCustomerService'
import UpdateCustomer from '../services/UpdateCustomerService'

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { per_page, page } = request.query

    const listCustomers = new ListCustomerService()

    const customers = await listCustomers.execute(
      per_page as string,
      page as string,
    )

    return response.json(customers)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const createCustomers = new CreateCustomerService()

    const customer = await createCustomers.execute({ name, email })

    return response.json(customer)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showCustomers = new ShowCustomer()

    const customer = await showCustomers.execute({ id })

    return response.json(customer)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email } = request.body

    const updateCustomers = new UpdateCustomer()

    const customer = await updateCustomers.execute({ id, name, email })

    return response.json(customer)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCustomers = new DeleteCustomer()

    await deleteCustomers.execute({ id })

    return response.json({ message: 'Successfully deleted product' })
  }
}
