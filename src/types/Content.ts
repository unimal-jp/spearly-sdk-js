import { FieldTypeAll, ServerFieldTypeAll } from './FieldType'

export type Content = {
  publicUid: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  contentAlias: string
  fields: {
    [key: string]: FieldTypeAll
  }
}

export type ServerContent = {
  fields: {
    [key: string]: ServerFieldTypeAll
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
} & Omit<Content, 'fields' | 'createdAt' | 'updatedAt' | 'publishedAt'>
