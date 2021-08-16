import { FieldTypeAll } from './FieldType'

export type Content = {
  publicUid: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  contentAlias: string
  fields: {
    [key: string]: FieldTypeAll
  }
}
