import nodemailer, { Transporter } from 'nodemailer'
import smtp from '@config/smtp'
import ejs from 'ejs'

interface IMail {
  to: string
  subject: string
  html: string
}

class BaseMail {
  private transporter: Transporter
  protected data: IMail

  constructor() {
    this.transporter = nodemailer.createTransport(smtp)
  }

  send = () => {
    this.transporter.sendMail({
      ...this.data,
      html: ejs.render(this.data.html),
    })
  }
}

export default BaseMail
