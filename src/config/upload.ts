import multer, { StorageEngine } from 'multer'
import path from 'path'
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')
const tempFolder = path.resolve(__dirname, '..', '..', 'temp')

interface IUploadConfig {
  driver: 's3' | 'disk'
  tempFolder: string
  directory: string
  multer: {
    storage: StorageEngine
  }
  config: {
    aws: {
      region: string
      key: string
      secret: string
      bucket: string
    }
  }
}

export default {
  directory: uploadFolder,
  tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')

        const filename = `${fileHash}-${file.originalname}`

        callback(null, filename)
      },
    }),
  },
  config: {
    aws: {
      region: process.env.AWS_REGION,
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
} as IUploadConfig
