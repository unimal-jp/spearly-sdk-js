import { FieldTypeAll } from './FieldType'

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
