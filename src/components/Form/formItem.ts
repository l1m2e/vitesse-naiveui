import { NInput } from 'naive-ui'

export const formItemComponentMap = {
  'n-input': NInput,
} as const

export type FromComponentType = keyof typeof formItemComponentMap
