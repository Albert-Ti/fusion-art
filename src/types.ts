export enum ImageStyles {
  DEFAULT = 'DEFAULT',
  ANIME = 'ANIME',
  KANDINSKY = 'KANDINSKY',
  UHD = 'UHD',
}

export type ImageConfig = {
  count?: number
  width?: number
  height?: number
  negative?: string
}

export type TaskResponse = {
  status: string
  uuid: string
  status_time: string
}

export type TaskStatusResponse = {
  uuid: string
  status: string
  images: string[]
  errorDescription: string
  censored: boolean
}

export type ModelResponse = {
  id: number
  name: string
  version: number
  type: number
}
