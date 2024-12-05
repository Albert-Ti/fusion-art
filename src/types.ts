export enum EnumStyles {
  DEFAULT = 'DEFAULT',
  ANIME = 'ANIME',
  KANDINSKY = 'KANDINSKY',
  UHD = 'UHD',
}

export enum EnumStatus {
  INITIAL = 'INITIAL',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAIL = 'FAIL',
}

export enum EnumTypeImage {
  ORIGINAL = 'ORIGINAL',
  THUMBNAIL = 'THUMBNAIL',
}

export type ImageConfig = {
  count?: number
  width?: number
  height?: number
  negative?: string
}

export type ModelResponse = {
  id: number
  name: string
  version: number
  type: number
}

export type TaskResponse = {
  status: EnumStatus
  uuid: string
  status_time: string
}

export type TaskStatusResponse = {
  uuid: string
  status: EnumStatus
  images: string[]
  errorDescription: string
  censored: boolean
}
