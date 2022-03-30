import { SpearlyContent, ServerSpearlyContent, SpearlyFieldTypeAll } from '../types'

export const mapSpearlyContent = (content: ServerSpearlyContent): SpearlyContent => {
  const fields: { [key: string]: SpearlyFieldTypeAll } = {}
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
