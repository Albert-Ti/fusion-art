import {Module} from '@nestjs/common'
import {PrismaModule} from './prisma/prisma.module'
import { ImagesModule } from './images/images.module';
import { FusionBrainService } from './fusion-brain/fusion-brain.service';

@Module({
  imports: [PrismaModule, ImagesModule],
  providers: [FusionBrainService],
})
export class AppModule {}
