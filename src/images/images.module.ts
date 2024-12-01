import {Module} from '@nestjs/common'
import {ImagesService} from './images.service'
import {ImagesController} from './images.controller'
import {PrismaService} from 'src/prisma/prisma.service'
import {FusionBrainService} from 'src/fusion-brain/fusion-brain.service'

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, FusionBrainService],
})
export class ImagesModule {}
