import {ApiProperty} from '@nestjs/swagger'
import {IsString} from 'class-validator'
import {ImageStyles} from 'src/types'

export class CreateImageDto {
  @ApiProperty({example: 'Море', description: 'Описание изображения'})
  @IsString()
  prompt: string

  @ApiProperty({example: 'ANIME', description: 'Стиль изображения'})
  @IsString()
  style: ImageStyles
}
