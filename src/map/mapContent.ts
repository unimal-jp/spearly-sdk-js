import { Content, ServerContent } from '../types'

export const mapContent = (content: ServerContent): Content => {
  const values = content.values
  const fields = content.attributes.fields.data.map((field) => {
    if (field.attributes.inputType !== 'calendar') return field
    const date = new Date(field.attributes.value as string)
    values[field.attributes.identifier] = date
    return {
      ...field,
      value: date,
    }
  })

  return {
    ...content,
    values,
    attributes: {
      ...content.attributes,
      fields: {
        data: fields,
      },
      createdAt: new Date(content.attributes.createdAt),
      updatedAt: new Date(content.attributes.updatedAt),
      publishedAt: new Date(content.attributes.publishedAt),
    },
  }
}
