import {Injectable} from '@nestjs/common'
import {CreateImageDto} from './dto/create-image.dto'
import {PrismaService} from 'src/prisma/prisma.service'

@Injectable()
export class ImagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateImageDto) {
    return await this.prismaService.image.create({
      data: {
        ...dto,
        originalUrl: '',
        thumbnailUrl: '',
      },
    })
  }

  async findAll(page: number, limit: number) {
    return await this.prismaService.image.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findOne(id: number) {
    return await this.prismaService.image.findUnique({where: {id}})
  }
}
