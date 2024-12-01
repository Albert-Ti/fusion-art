import {INestApplication} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

export class SwaggerService {
  public static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Fusion Art')
      .setDescription('Сервис по созданию картинок с помощью нейросети')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
  }
}
