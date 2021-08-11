import { Content } from './Content'

export type List = {
  name: string
  identifier: string
  publicUid: string
  totalContentsCount: number
  matchingContentsCount: number
  limit: number
  offset: number
  next: number
  contents: Content[]
}
