import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Product from '@modules/products/entities/Product'
import Order from './Order'

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @Column()
  order_id: string

  @Column()
  product_id: string

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product, products => products.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default OrdersProducts
