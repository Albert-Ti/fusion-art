import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {CreateImageDto} from './dto/create-image.dto'
import {FilterImageDto} from './dto/filter-image.dto'
import {ImagesService} from './images.service'

@ApiTags('Изображения')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({summary: 'Создание изображения'})
  @Post()
  async create(@Body() dto: CreateImageDto) {
    return await this.imagesService.create(dto)
  }

  @ApiOperation({summary: 'Проверить статус изображения'})
  @Get(':id')
  async checkImage(@Param('id') id: string) {
    return await this.imagesService.checkImage(+id)
  }

  @ApiOperation({summary: 'Получение списка миниатюр'})
  @Get()
  findAll(@Query() {page = 1, limit = 10}: FilterImageDto) {
    return this.imagesService.findAll(page, limit)
  }
}
