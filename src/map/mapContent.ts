import { Content, ServerContent, FieldTypeAll } from '../types'

export const mapContent = (content: ServerContent): Content => {
  const fields: { [key: string]: FieldTypeAll } = {}
  Object.keys(content.fields).forEach((name) => {
    if (content.fields[name].inputType !== 'calendar') {
      fields[name] = content.fields[name]
      return
    }
    fields[name] = {
      inputType: 'calendar',
      value: new Date(content.fields[name].value as string),
    }
  })

  return {
    ...content,
    fields,
    createdAt: new Date(content.createdAt),
    updatedAt: new Date(content.updatedAt),
    publishedAt: new Date(content.publishedAt),
  }
}
