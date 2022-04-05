export type SpearlyFieldInputType = 'text' | 'number' | 'rich_text' | 'image' | 'calendar' | 'map' | 'content_type' | 'tags'

export type SpearlyFieldType<T> = {
  id: string
  type: 'field'
  attributes: {
    identifier: string
    inputType: SpearlyFieldInputType
    value: T
  }
}

export type MapValue = {
  preferredFormat: string
  address: string
  latitude: number
  longitude: number
}

export type SpearlyFieldTypeText = SpearlyFieldType<string>

export type SpearlyFieldTypeNumber = SpearlyFieldType<number>

export type SpearlyFieldTypeRichText = SpearlyFieldType<string>

export type SpearlyFieldTypeImage = SpearlyFieldType<string>

export type SpearlyFieldTypeCalendar = SpearlyFieldType<Date>

export type SpearlyFieldTypeMap = SpearlyFieldType<MapValue>

export type SpearlyFieldTypeTags = SpearlyFieldType<string[]>

export type SpearlyFieldTypeContentType = SpearlyFieldType<
  (
    | SpearlyFieldTypeText
    | SpearlyFieldTypeNumber
    | SpearlyFieldTypeRichText
    | SpearlyFieldTypeImage
    | SpearlyFieldTypeCalendar
    | SpearlyFieldTypeMap
    | SpearlyFieldTypeTags
  )[]
>

export type SpearlyFieldTypeAll =
  | SpearlyFieldTypeText
  | SpearlyFieldTypeNumber
  | SpearlyFieldTypeRichText
  | SpearlyFieldTypeImage
  | SpearlyFieldTypeCalendar
  | SpearlyFieldTypeMap
  | SpearlyFieldTypeTags
  | SpearlyFieldTypeContentType

export type ServerSpearlyFieldTypeCalendar = SpearlyFieldType<string>

export type ServerSpearlyFieldTypeAll =
  | SpearlyFieldTypeText
  | SpearlyFieldTypeNumber
  | SpearlyFieldTypeRichText
  | SpearlyFieldTypeImage
  | ServerSpearlyFieldTypeCalendar
  | SpearlyFieldTypeMap
  | SpearlyFieldTypeTags
  | SpearlyFieldTypeContentType
