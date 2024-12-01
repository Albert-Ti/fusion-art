import {ApiPropertyOptional} from '@nestjs/swagger'
import {IsNumber} from 'class-validator'

export class FilterImageDto {
  @ApiPropertyOptional({example: 1})
  @IsNumber()
  page: number

  @ApiPropertyOptional({example: 10})
  @IsNumber()
  limit: number
}
