import DiskStorageProvider from './DiskStorageProvider'
import S3StorageProvider from './S3StorageProvider'

// TODO: refactor to accept other storage types

export default class StorageProvider extends DiskStorageProvider {
  constructor() {
    super()
  }
}
