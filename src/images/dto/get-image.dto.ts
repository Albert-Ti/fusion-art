import {ApiProperty} from '@nestjs/swagger'
import {IsString} from 'class-validator'
import {EnumTypeImage} from 'src/types'

export class GetImageDto {
  @ApiProperty({example: 'original', description: 'Стиль изображения'})
  @IsString()
  type: EnumTypeImage
}
