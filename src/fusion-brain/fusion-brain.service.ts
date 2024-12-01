import {BadRequestException, Injectable} from '@nestjs/common'
import axios from 'axios'
import {CreateImageDto} from 'src/images/dto/create-image.dto'
import {ImageConfig, ModelResponse, TaskResponse, TaskStatusResponse} from 'src/types'

@Injectable()
export class FusionBrainService {
  private readonly apiUrl = process.env.FUSION_BRAIN_URL
  private readonly apiKey = process.env.FUSION_BRAIN_API_KEY
  private readonly secretKey = process.env.FUSION_BRAIN_SECRET_KEY
  private readonly headers = {
    'X-Key': `Key ${this.apiKey}`,
    'X-Secret': `Secret ${this.secretKey}`,
  }

  async getModel() {
    const {data} = await axios.get<ModelResponse>(`${this.apiUrl}key/api/v1/models`, {
      headers: this.headers,
    })
    return data[0].id
  }

  async generate(dto: CreateImageDto, model: string, config?: ImageConfig) {
    const params = {
      type: 'GENERATE',
      style: dto.style ?? 'DEFAULT',
      numImages: config?.count ?? 1,
      width: config?.width ?? 768,
      height: config?.height ?? 768,
      negativePromptUnclip: config?.negative ?? '',
      generateParams: {
        query: dto.prompt,
      },
    }

    const formData = new FormData()
    formData.append('params', new Blob([JSON.stringify(params)], {type: 'application/json'}))
    formData.append('model_id', `${model}`)

    try {
      const {data} = await axios.post<TaskResponse>(
        `${this.apiUrl}key/api/v1/text2image/run`,
        formData,
        {
          headers: this.headers,
        },
      )

      return data.uuid
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async checkGeneration(uuid: string) {
    const {data} = await axios.get<TaskStatusResponse>(
      `${this.apiUrl}key/api/v1/text2image/status/${uuid}`,
      {
        headers: this.headers,
      },
    )
    return data
  }
}
