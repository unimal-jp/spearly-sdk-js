import { Content, ServerContent } from './Content'

export type List = {
  totalContentsCount: number
  matchingContentsCount: number
  limit: number
  offset: number
  next: number
  data: Content[]
}

export type ServerList = {
  data: ServerContent[]
} & Omit<List, 'data'>
