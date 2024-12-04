import {Injectable} from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import {PrismaService} from 'src/prisma/prisma.service'
import {EnumStatus} from 'src/types'
import {CreateImageDto} from './dto/create-image.dto'
import {FusionBrainApiService} from 'src/fusion-brain-api/fusion-brain-api.service'

@Injectable()
export class ImagesService {
  private readonly uploadDir = path.join(__dirname, '../../uploads')

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fusionBrainApiService: FusionBrainApiService,
  ) {}

  async create(dto: CreateImageDto) {
    const model = await this.fusionBrainApiService.getModel()
    const uuid = await this.fusionBrainApiService.generate(dto.prompt, dto.style, model)

    const createdImage = await this.prismaService.image.create({
      data: {...dto, uuid, status: EnumStatus.PROCESSING},
    })

    try {
      const data = await this.fusionBrainApiService.checkGeneration(uuid)
      this.decodeAndSaveImage(data.images[0], uuid)

      await this.prismaService.image.update({
        where: {id: createdImage.id},
        data: {status: EnumStatus.DONE, original_url: `${this.uploadDir}/${uuid}.jpg`},
      })
    } catch (e) {
      await this.prismaService.image.update({
        where: {id: createdImage.id},
        data: {status: EnumStatus.FAIL},
      })
    }
  }

  async check(id: number) {
    return await this.prismaService.image.findUnique({where: {id}})
  }

  async findAll(page: number, limit: number) {
    return await this.prismaService.image.findMany({
      skip: page,
      take: limit,
    })
  }

  decodeAndSaveImage(base64Image: string, uuid: string) {
    const buffer = Buffer.from(base64Image, 'base64')
    fs.writeFileSync(`${this.uploadDir}/${uuid}.jpg`, buffer)
  }
}
