import {BadRequestException, Injectable} from '@nestjs/common'
import axios from 'axios'
import {EnumStatus, ImageConfig, ModelResponse, TaskResponse, TaskStatusResponse} from 'src/types'

@Injectable()
export class FusionBrainApiService {
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

  async generate(prompt: string, style: string, model: string, config?: ImageConfig) {
    const params = {
      type: 'GENERATE',
      style: style ?? 'DEFAULT',
      numImages: config?.count ?? 1,
      width: config?.width ?? 768,
      height: config?.height ?? 768,
      negativePromptUnclip: config?.negative ?? '',
      generateParams: {
        query: prompt,
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

  async checkGeneration(uuid: string, attempts = 10, delay = 10000) {
    try {
      while (attempts > 0) {
        const {data} = await axios.get<TaskStatusResponse>(
          `${this.apiUrl}key/api/v1/text2image/status/${uuid}`,
          {headers: this.headers},
        )

        if (data.status === EnumStatus.DONE) {
          return data
        }

        attempts -= 1
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } catch (e) {
      throw new BadRequestException(e.response?.data || 'Error checking generation status')
    }
  }
}
