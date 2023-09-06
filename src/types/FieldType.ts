import { Content } from './Content'

export type FieldInputType = 'text' | 'number' | 'rich_text' | 'image' | 'calendar' | 'map' | 'content_type' | 'tags'

export type FieldType<T> = {
  id: string
  type: 'field'
  attributes: {
    identifier: string
    inputType: FieldInputType
    value: T
  }
}

export type MapValue = {
  preferredFormat: string
  address: string
  latitude: number
  longitude: number
}

export type ContentTypeValue = {
  data: Content
}

export type FieldTypeText = FieldType<string>

export type FieldTypeNumber = FieldType<number>

export type FieldTypeRichText = FieldType<string>

export type FieldTypeImage = FieldType<string>

export type FieldTypeCalendar = FieldType<Date>

export type FieldTypeMap = FieldType<MapValue>

export type FieldTypeTags = FieldType<string[]>

export type FieldTypeContentType = FieldType<ContentTypeValue>

export type FieldTypeAll =
  | FieldTypeText
  | FieldTypeNumber
  | FieldTypeRichText
  | FieldTypeImage
  | FieldTypeCalendar
  | FieldTypeMap
  | FieldTypeTags
  | FieldTypeContentType

export type ServerFieldTypeCalendar = FieldType<string>

export type ServerFieldTypeAll =
  | FieldTypeText
  | FieldTypeNumber
  | FieldTypeRichText
  | FieldTypeImage
  | ServerFieldTypeCalendar
  | FieldTypeMap
  | FieldTypeTags
  | FieldTypeContentType
