import {Injectable} from '@nestjs/common'
import {Client} from 'minio'

@Injectable()
export class MinioService {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      endPoint: 'localhost',
      port: +process.env.MINIO_PORT || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD,
    })
  }

  async uploadFile(bucketName: string, fileName: string, buffer: Buffer) {
    await this.client.putObject(bucketName, fileName, buffer)

    return this.client.presignedUrl('GET', bucketName, fileName)
  }

  async ensureBucket(bucketName: string) {
    const exists = await this.client.bucketExists(bucketName)

    if (!exists) {
      await this.client.makeBucket(bucketName, '')
    }
  }
}
