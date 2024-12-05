import {BadRequestException, Injectable} from '@nestjs/common'
import * as sharp from 'sharp'
import {FusionBrainApiService} from 'src/fusion-brain-api/fusion-brain-api.service'
import {MinioService} from 'src/minio/minio.service'
import {PrismaService} from 'src/prisma/prisma.service'
import {EnumStatus, EnumStyles, EnumTypeImage} from 'src/types'
import {CreateImageDto} from './dto/create-image.dto'

@Injectable()
export class ImagesService {
  private readonly bucketName = 'images'

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fusionBrainApiService: FusionBrainApiService,
    private readonly minioService: MinioService,
  ) {}

  async create(dto: CreateImageDto) {
    const allowedStyles = Object.values(EnumStyles)

    if (!allowedStyles.includes(dto.style)) {
      throw new BadRequestException(
        `Некорректный стиль. Используйте одно из перечисленных: ${allowedStyles.join(', ')}`,
      )
    }

    const model = await this.fusionBrainApiService.getModel()
    const uuid = await this.fusionBrainApiService.generate(dto.prompt, dto.style, model)

    const createdImage = await this.prismaService.image.create({
      data: {...dto, uuid, status: EnumStatus.PROCESSING},
    })

    try {
      const data = await this.fusionBrainApiService.checkGeneration(uuid)
      const originalBuffer = Buffer.from(data.images[0], 'base64')

      const {original_url, thumbnail_url} = await this.uploadImages(
        uuid,
        originalBuffer,
        this.bucketName,
      )

      return await this.prismaService.image.update({
        where: {id: createdImage.id},
        data: {status: EnumStatus.DONE, original_url, thumbnail_url},
      })
    } catch (e) {
      await this.prismaService.image.update({
        where: {id: createdImage.id},
        data: {status: EnumStatus.FAIL},
      })
      throw new BadRequestException(`Ошибка при генерации изображения ${e}`)
    }
  }

  async getImageByType(id: string, type: EnumTypeImage) {
    const allowedTypes = Object.values(EnumTypeImage)

    if (!allowedTypes.includes(type)) {
      throw new BadRequestException(
        `Некорректный тип изображения. Используйте одно из перечисленных: ${allowedTypes.join(', ')}`,
      )
    }

    try {
      const image = await this.prismaService.image.findUnique({where: {id: +id}})
      if (type === EnumTypeImage.ORIGINAL) return image.original_url
      if (type === EnumTypeImage.THUMBNAIL) return image.thumbnail_url
    } catch (e) {
      throw new BadRequestException(`Не удалось получить изображение ${e}`)
    }
  }

  async getThumbnails({page, limit}) {
    const skip = (+page - 1) * +limit
    const take = +limit
    try {
      return await this.prismaService.image.findMany({
        skip,
        take,
        select: {id: true, thumbnail_url: true},
      })
    } catch (e) {
      throw new BadRequestException(`Не удалось получить список миниатюр ${e}`)
    }
  }

  async uploadImages(uuid: string, buffer: Buffer, bucketName: string) {
    const thumbnailBuffer = await sharp(buffer).resize(128, 128).webp().toBuffer()
    await this.minioService.ensureBucket(bucketName)

    const original_url = await this.minioService.uploadFile(
      bucketName,
      `original-${uuid}.jpg`,
      buffer,
    )

    const thumbnail_url = await this.minioService.uploadFile(
      bucketName,
      `thumbnail-${uuid}.webp`,
      thumbnailBuffer,
    )

    return {original_url, thumbnail_url}
  }
}
