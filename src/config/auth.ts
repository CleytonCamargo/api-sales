export default {
  jwt: {
    secret: process.env.AUTH_SECRET || '',
    expiresIn: process.env.AUTH_EXPIRES,
  },
}
