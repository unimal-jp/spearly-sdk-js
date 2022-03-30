import { SpearlyContent, ServerSpearlyContent } from './SpearlyContent'

export type SpearlyList = {
  name: string
  identifier: string
  publicUid: string
  totalContentsCount: number
  matchingContentsCount: number
  limit: number
  offset: number
  next: number
  contents: SpearlyContent[]
}

export type ServerSpearlyList = {
  contents: ServerSpearlyContent[]
} & Omit<SpearlyList, 'contents'>
