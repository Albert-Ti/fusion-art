import {Module} from '@nestjs/common'
import {FusionBrainApiService} from 'src/fusion-brain-api/fusion-brain-api.service'
import {MinioService} from 'src/minio/minio.service'
import {PrismaService} from 'src/prisma/prisma.service'
import {ImagesController} from './images.controller'
import {ImagesService} from './images.service'

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, FusionBrainApiService, MinioService],
})
export class ImagesModule {}
