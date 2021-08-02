import RedisCacheProvider from './RedisCacheProvider'

// TODO: refactor to accept other cache types

export default class CacheProvider extends RedisCacheProvider {
  constructor() {
    super()
  }
}
