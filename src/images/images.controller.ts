import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {CreateImageDto} from './dto/create-image.dto'
import {FilterImageDto} from './dto/filter-image.dto'
import {GetImageDto} from './dto/get-image.dto'
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

  @ApiOperation({summary: 'Получение списка миниатюр'})
  @Get()
  async getThumbnails(@Query() query: FilterImageDto) {
    return await this.imagesService.getThumbnails(query)
  }

  @ApiOperation({summary: 'Получить изображение по типу'})
  @Get(':id')
  async getImageByType(@Param('id') id: string, @Query() {type}: GetImageDto) {
    return await this.imagesService.getImageByType(id, type)
  }
}
