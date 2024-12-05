import {Module} from '@nestjs/common'
import {ImagesModule} from './images/images.module'
import {PrismaModule} from './prisma/prisma.module'

@Module({
  imports: [PrismaModule, ImagesModule],
})
export class AppModule {}
