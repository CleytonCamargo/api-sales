import Cache from '@shared/providers/CacheProvider/CacheProvider'

export default class BaseService {
  async saveNewCacheKey(moduleKeys: string, key: string) {
    const cache = new Cache()

    const keys =
      ((await cache.recover('api-sales-PRODUCTS-KEYS')) as Array<string>) || []

    keys.push(key)

    await cache.save('api-sales-PRODUCTS-KEYS', keys)
  }
  async invalidateChacheKeys(moduleKeys: string) {
    const cache = new Cache()

    const keys = (await cache.recover(moduleKeys)) as Array<string>

    keys.forEach(key => cache.invalidate(key))
  }
}
