import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {SwaggerService} from './swagger/swagger.service'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  SwaggerService.setupSwagger(app)

  await app.listen(PORT, () =>
    console.log(`\x1b[32mСервер запущен на порту: \x1b[33m${PORT}\x1b[0m`),
  )
}

bootstrap()
