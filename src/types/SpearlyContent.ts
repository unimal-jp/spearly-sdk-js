import { SpearlyFieldTypeAll, ServerSpearlyFieldTypeAll } from './SpearlyFieldType'

export type SpearlyContent = {
  publicUid: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  contentAlias: string
  fields: {
    [key: string]: SpearlyFieldTypeAll
  }
}

export type ServerSpearlyContent = {
  fields: {
    [key: string]: ServerSpearlyFieldTypeAll
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
} & Omit<SpearlyContent, 'fields' | 'createdAt' | 'updatedAt' | 'publishedAt'>
