import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common'
import {CreateImageDto} from './dto/create-image.dto'
import {ImagesService} from './images.service'
import {ApiOperation, ApiTags} from '@nestjs/swagger'

@ApiTags('Изображения')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({summary: 'Создание изображения'})
  @Post()
  async create(@Body() dto: CreateImageDto) {
    return await this.imagesService.create(dto)
  }

  @ApiOperation({summary: 'Получение списка миниатюр'})
  @Get()
  findAll(@Query() {page = 1, limit = 10}: {page: number; limit: number}) {
    return this.imagesService.findAll(page, limit)
  }

  @ApiOperation({summary: 'Получение файла изображения'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id)
  }
}
