import { FieldTypeAll } from './'

export type Content = {
  attributes: {
    contentAlias: string
    createdAt: Date
    fields: {
      data: FieldTypeAll[]
    }
    nextContent: Content | null
    previousContent: Content | null
    publicUid: string
    publishedAt: Date
    updatedAt: Date
  }
  id: string
  type: 'content'
  values: {
    [key: string]: unknown
  }
}

export type ServerContent = {
  attributes: {
    createdAt: string
    publishedAt: string
    updatedAt: string
  } & Omit<Content['attributes'], 'createdAt' | 'publishedAt' | 'updatedAt'>
} & Omit<Content, 'attributes'>
