import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {FusionBrainService} from 'src/fusion-brain/fusion-brain.service'
import {CreateImageDto} from './dto/create-image.dto'
import {FilterImageDto} from './dto/filter-image.dto'
import {ImagesService} from './images.service'

@ApiTags('Изображения')
@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly fusionBrainService: FusionBrainService,
  ) {}

  @ApiOperation({summary: 'Создание изображения'})
  @Post()
  async create(@Body() dto: CreateImageDto) {
    const model = await this.fusionBrainService.getModel()

    return await this.fusionBrainService.generate(dto, model)
  }

  @ApiOperation({summary: 'Получение списка миниатюр'})
  @Get()
  findAll(@Query() {page = 1, limit = 10}: FilterImageDto) {
    return this.imagesService.findAll(page, limit)
  }

  @ApiOperation({summary: 'Получение файла изображения'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id)
  }
}
