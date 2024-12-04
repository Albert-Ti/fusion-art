import {Module} from '@nestjs/common'
import {ImagesService} from './images.service'
import {ImagesController} from './images.controller'
import {PrismaService} from 'src/prisma/prisma.service'
import {FusionBrainApiService} from 'src/fusion-brain-api/fusion-brain-api.service'

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, FusionBrainApiService],
})
export class ImagesModule {}
