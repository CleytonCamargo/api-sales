import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  }
  driver: string
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
  driver: process.env.CACHE_DRIVER,
} as ICacheConfig
