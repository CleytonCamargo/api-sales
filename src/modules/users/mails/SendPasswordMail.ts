import BaseMail from '@shared/utils/BaseMail'

interface ISendPasswordMail {
  to: string
  password: string
}

/**
 * TODO
 * Create template
 */

export default class SendPasswordMail extends BaseMail {
  constructor({ to, password }: ISendPasswordMail) {
    super()
    this.data = {
      to: to,
      subject: 'New user',
      html: `
        <h3>New user created</h3>
        <h5>Use the password below to access:</h5>
        <p>${password}</p>
      `,
    }
  }
}
