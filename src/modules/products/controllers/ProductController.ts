import { Request, Response } from 'express'
import CreateProductService from '../services/CreateProductService'
import DeleteProductService from '../services/DeleteProductService'
import ListProductService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import UpdateProductService from '../services/UpdateProductService'

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { per_page, page } = request.query

    const listProducts = new ListProductService()

    const products = await listProducts.execute(
      per_page as string,
      page as string,
    )

    return response.json(products)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body

    const createProducts = new CreateProductService()

    const product = await createProducts.execute({ name, price, quantity })

    return response.json(product)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showProducts = new ShowProductService()

    const product = await showProducts.execute({ id })

    return response.json(product)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, price, quantity } = request.body

    const updateProducts = new UpdateProductService()

    const product = await updateProducts.execute({ id, name, price, quantity })

    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteProducts = new DeleteProductService()

    await deleteProducts.execute({ id })

    return response.json({ message: 'Successfully deleted product' })
  }
}
