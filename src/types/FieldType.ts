export type FieldType<T> = {
  inputType: 'text' | 'number' | 'rich_text' | 'image' | 'calendar' | 'map' | 'content_type' | 'tags'
  value: T
}

export type FieldTypeText = FieldType<string>

export type FieldTypeNumber = FieldType<number>

export type FieldTypeRichText = FieldType<string>

export type FieldTypeImage = FieldType<string>

export type FieldTypeCalendar = FieldType<Date>

export type FieldTypeMap = FieldType<{
  preferredFormat: string
  address: string
  latitude: number
  longitude: number
}>

export type FieldTypeTags = FieldType<string[]>

export type FieldTypeContentType = FieldType<
  (
    | FieldTypeText
    | FieldTypeNumber
    | FieldTypeRichText
    | FieldTypeImage
    | FieldTypeCalendar
    | FieldTypeMap
    | FieldTypeTags
  )[]
>

export type FieldTypeAll =
  | FieldTypeText
  | FieldTypeNumber
  | FieldTypeRichText
  | FieldTypeImage
  | FieldTypeCalendar
  | FieldTypeMap
  | FieldTypeTags
  | FieldTypeContentType
