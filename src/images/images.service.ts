import {Injectable} from '@nestjs/common'
import {PrismaService} from 'src/prisma/prisma.service'
import * as path from 'path'

@Injectable()
export class ImagesService {
  private readonly uploadDir = path.join(__dirname, '../../uploads')

  constructor(private readonly prismaService: PrismaService) {}

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
