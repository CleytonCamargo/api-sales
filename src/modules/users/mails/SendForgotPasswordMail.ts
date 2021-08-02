import BaseMail from '@shared/utils/BaseMail'

interface ISendForgotPasswordMail {
  to: string
  link: string
}

/**
 * TODO
 * Create template
 */

export default class SendForgotPasswordMail extends BaseMail {
  constructor({ to, link }: ISendForgotPasswordMail) {
    super()
    this.data = {
      to: to,
      subject: 'Password reset request',
      html: `
        <h3>Password reset request</h3>
        <h5>Access the link below to reset the password:</h5>
        <a href="${link}">click here</a>
      `,
    }
  }
}
