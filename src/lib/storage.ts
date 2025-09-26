import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_PUBLIC_URL?.replace('https://', 'https://'),
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export class StorageManager {
  private bucketName: string
  private publicUrl: string

  constructor() {
    this.bucketName = process.env.R2_BUCKET_NAME || 'aic-files'
    this.publicUrl = process.env.R2_PUBLIC_URL || ''
  }

  async uploadFile(file: File, prefix: string = 'uploads'): Promise<string> {
    const fileExtension = file.name.split('.').pop()
    const key = `${prefix}/${uuidv4()}.${fileExtension}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    })

    await s3Client.send(command)
    return key
  }

  async getFileUrl(key: string): Promise<string> {
    return `${this.publicUrl}/${key}`
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })

    await s3Client.send(command)
  }

  async getFileMetadata(key: string): Promise<any> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      const response = await s3Client.send(command)
      return {
        contentType: response.ContentType,
        contentLength: response.ContentLength,
        lastModified: response.LastModified,
        metadata: response.Metadata,
      }
    } catch (error) {
      console.error('Error getting file metadata:', error)
      return null
    }
  }

  generateKey(prefix: string, extension: string): string {
    return `${prefix}/${uuidv4()}.${extension}`
  }
}

export const storageManager = new StorageManager()
