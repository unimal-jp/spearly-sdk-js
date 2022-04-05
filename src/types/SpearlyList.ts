import { SpearlyContent, ServerSpearlyContent } from './SpearlyContent'

export type SpearlyList = {
  totalContentsCount: number
  matchingContentsCount: number
  limit: number
  offset: number
  next: number
  data: SpearlyContent[]
}

export type ServerSpearlyList = {
  data: ServerSpearlyContent[]
} & Omit<SpearlyList, 'data'>
